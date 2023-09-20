import Loan from "../models/Loan.js";
import Tool from "../models/Tool.js";
import { ToolService } from "../services/ToolService.js";
import { ReservationService } from "../services/ReservationService.js";

import sequelize from "../config/database-connection.js";
import { QueryTypes } from "sequelize";

class LoanService {
  static async findAll() {
    const objs = await Loan.findAll({
      include: { all: true, nested: true },
    });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await Loan.findByPk(id, {
      include: { all: true, nested: true },
    });
    return obj;
  }

  static async create(req) {
    const { date, mechanic, items } = req.body;
    if (await this.checkBusinessRules(req)) {
      const t = await sequelize.transaction();
      const obj = await Loan.create(
        { date, mechanicId: mechanic.id },
        { transaction: t }
      );
      try {
        await Promise.all(
          items.map((item) =>
            obj.createItem(
              {
                delivery: item.delivery,
                loanId: obj.id,
                toolId: item.tool.id,
              },
              { transaction: t }
            )
          )
        );
        await Promise.all(
          items.map(async (item) =>
            (
              await Tool.findByPk(item.tool.id)
            ).update({ available: 0 }, { transaction: t })
          )
        );
        await t.commit();
        return await Loan.findByPk(obj.id, {
          include: { all: true, nested: true },
        });
      } catch (error) {
        await t.rollback();
        throw "At least one of the informed tools wasn't found!";
      }
    }
  }

  static async update(req) {
    const { id } = req.params;
    const { date, mechanic, items } = req.body;
    const obj = await Loan.findByPk(id, {
      include: { all: true, nested: true },
    });
    if (obj == null) throw "Loan not found!";
    const t = await sequelize.transaction();
    Object.assign(obj, { date, mechanicId: mechanic.id });
    await obj.save({ transaction: t });
    try {
      await Promise.all(
        (await obj.itens).map((item) => item.destroy({ transaction: t }))
      ); // destroying all items of this loan
      await Promise.all(
        items.map((item) =>
          obj.createItem(
            {
              delivery: item.delivery,
              loanId: obj.id,
              fitaId: item.fita.id,
            },
            { transaction: t }
          )
        )
      );
      await t.commit();
      return await Loan.findByPk(obj.id, {
        include: { all: true, nested: true },
      });
    } catch (error) {
      await t.rollback();
      throw "At least one of the informed tools wasn't found!";
    }
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await Loan.findByPk(id);
    if (obj == null) throw "Loan not found!";
    try {
      await obj.destroy();
      return obj;
    } catch (error) {
      throw "It wasn't possible to delete a loan that has devolutions!";
    }
  }

  static async findBymechanic(req) {
    const { mechanicId } = req.params;
    const objs = await sequelize.query(
      "SELECT * FROM loans WHERE mechanic_id = :mechanicId",
      { replacements: { mechanicId: mechanicId }, type: QueryTypes.SELECT }
    );
    return objs;
  }

  static async findBymechanicAndPeriod(req) {
    const { mechanicId } = req.params;
    const objs = await sequelize.query(
      "SELECT * FROM loans WHERE mechanic_id = :mechanicId",
      { replacements: { mechanicId: mechanicId }, type: QueryTypes.SELECT }
    );
    return objs;
  }

  static async findLoansTotalAndAmountOfMechanicsByPeriod(req) {
    const { start, end } = req.params;
    const objs = await sequelize.query(
      "SELECT mechanics.fullName AS fullName, SUM(value) AS total, COUNT(value) AS amount FROM loans INNER JOIN mechanics ON loans.mechanic_id = mechanics.id WHERE data > :start AND data < :end GROUP BY mechanics.fullName",
      {
        replacements: { start: start, end: end },
        type: QueryTypes.SELECT,
      }
    );
    return objs;
  }

  static async findTotalYearMonth() {
    const objs = await sequelize.query(
      "select count(loans.id), extract(year from data) as year, extract(month from data) as month from loans group by year, month order by year, month",
      { type: QueryTypes.SELECT }
    );
    return objs;
  }

  // Implementing business rules related to loan process:

  static async checkBusinessRules(req) {
    const { date, mechanic, items } = req.body;

    if (items.length == 0) {
      throw "There must be, at least, one tape selected!";
    }
    // Business Rule 1: Tools cannot be loaned to other mechanics
    let reservedTools = false;
    for (let item of items) {
      // Check if there are open reserves for the tools
      const reservation = await ReservationService.findByToolAndStatusRN(
        item.tool.id,
        "0"
      );
      if (reservation.length != 0) {
        reservedTools = true;
      }
    }
    if (reservedTools) {
      throw "There are reserved tools in open!";
    }

    // Business Rule 2: Tools cannot be loaned with status available false
    let availableTools = true;
    for (let item of items) {
      // Check if there are tools with status vailable false
      const tool = await ToolService.findByIdAndAvailable(item.tool.id, "0");
      if (tool.length != 0) {
        availableTools = false;
      }
    }
    if (!availableTools) {
      throw "There aren't available tools for loan!";
    }

    if (!reservedTools && availableTools) {
      return true;
    } else {
      return false;
    }
  }
}

export { LoanService };
