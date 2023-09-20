import Devolution from "../models/Devolution.js";
import LoanItem from "./../models/LoanItem.js";

import sequelize from "../config/database-connection.js";
import { QueryTypes } from "sequelize";

class DevolutionService {
  static async findAll() {
    const objs = await Devolution.findAll();
    return objs;
  }

  static async findByPk(req) {
    const { loanId, toolId } = req.params;
    const obj = await Devolution.findOne({
      where: { loanId: loanId, toolId: toolId },
    });
    return obj;
  }

  static async create(req) {
    const { date, loanId, toolId } = req.body;
    const item = await LoanItem.findOne({
      where: { loanId: loanId, toolId: toolId },
    });
    if (item == null)
      throw "The corresponding loan item wasn't found to associate it to the return!";
    const obj = await Devolution.create({ date, loanId, toolId });
    return await Devolution.findOne({
      where: { loanId: loanId, toolId: toolId },
    });
  }

  static async update(req) {
    const { loanId, toolId } = req.params;
    const { date } = req.body;
    const item = await LoanItem.findOne({
      where: { loanId: loanId, toolId: toolId },
    });
    if (item == null)
      throw "The corresponding loan item wasn't found to associate it to the return!";
    const obj = await Devolution.findOne({
      where: { loanId: loanId, toolId: toolId },
    });
    Object.assign(obj, { date, loanId, toolId });
    await obj.save();
    return await Devolution.findOne({
      where: { loanId: loanId, toolId: toolId },
    });
  }

  static async delete(req) {
    const { loanId, toolId } = req.params;
    const obj = await Devolution.findOne({
      where: { loanId: loanId, toolId: toolId },
    });
    await obj.destroy();
    return obj;
  }

  static async findByMechanicAndPeriod(req) {
    const { mechanicId, start, end } = req.params;
    const objs = await sequelize.query(
      "SELECT distinct devolutions.loan_id, devolutions.tool_id, devolutions.date FROM devolutions JOIN loans ON devolutions.loan_id = loans.id JOIN mechanics ON loans.mechanic_id = :mechanicId WHERE devolutions.date > :start AND devolutions.date < :end",
      {
        replacements: {
          mechanicId: mechanicId,
          start: start,
          end: end,
        },
        type: QueryTypes.SELECT,
      }
    );
    return objs;
  }

  static async findAmountDevolutionMechanicByPeriod(req) {
    const { start, end } = req.params;
    const objs = await sequelize.query(
      "SELECT mechanics.fullName AS fullName, count(devolutions.date) AS amount FROM devolutions INNER JOIN loans ON devolutions.loan_id = loans.id INNER JOIN mechanics ON loans.mechanic_id = mechanics.id WHERE devolutions.date > :start AND devolutions.date < :end GROUP BY mechanics.fullName",
      {
        replacements: { start: start, end: end },
        type: QueryTypes.SELECT,
      }
    );
    return objs;
  }
}

export { DevolutionService };
