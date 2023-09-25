import Reservation from "../models/Reservation.js";

import sequelize from "../config/database-connection.js";
import { QueryTypes } from "sequelize";

class ReservationService {
  static async findAll() {
    const objs = await Reservation.findAll({
      include: { all: true, nested: true },
    });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await Reservation.findByPk(id, {
      include: { all: true, nested: true },
    });
    return obj;
  }

  static async create(req) {
    const { date, status, mechanic, tool } = req.body;
    if (mechanic == null) throw "The reservation mechanic must be filled!";
    if (tool == null) throw "The reservation tool must be filled";
    const obj = await Reservation.create({
      date,
      status,
      mechanicId: mechanic.id,
      toolId: tool.id,
    });
    return await Reservation.findByPk(obj.id, {
      include: { all: true, nested: true },
    });
  }

  static async update(req) {
    const { id } = req.params;
    const { date, status, mechanic, tool } = req.body;
    if (mechanic == null) throw "The reservation mechanic must be filled!";
    if (tool == null) throw "The reservation tool must be filled";
    const obj = await Reservation.findByPk(id, {
      include: { all: true, nested: true },
    });
    if (obj == null) throw "Reservation not found!";
    Object.assign(obj, {
      date,
      status,
      mechanicId: mechanic.id,
      toolId: tool.id,
    });
    await obj.save();
    return await Reservation.findByPk(obj.id, {
      include: { all: true, nested: true },
    });
  }

  static async updateStatus(req) {
    const { id } = req.params;
    const { status } = req.body;
    if (status == null) throw "The reservation status must be filled!";
    const reservation = await Reservation.findByPk(id, {
      include: { all: true, nested: true },
    });
    if (reservation == null) throw "Reservation not found!";
    Object.assign(reservation, {
      status,
    });
    await reservation.save();
    return await Reservation.findByPk(reservation.id, {
      include: { all: true, nested: true },
    });
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await Reservation.findByPk(id);
    if (obj == null) throw "Reservation not found!";
    await obj.destroy();
    return obj;
  }

  static async findByTool(req) {
    const { toolId } = req.params;
    const objs = await sequelize.query(
      "SELECT * FROM reservations WHERE reservations.tool_id = :toolId",
      {
        replacements: { toolId: toolId },
        type: QueryTypes.SELECT,
      }
    );
    return objs;
  }

  static async findByMechanic(req) {
    const { mechanicId } = req.params;
    const objs = await sequelize.query(
      "SELECT * FROM reservations WHERE reservations.mechanic_id = :mechanicId",
      {
        replacements: {
          mechanicId: mechanicId,
        },
        type: QueryTypes.SELECT,
      }
    );
    return objs;
  }

  static async findAmountOfReservationssOfMechanicsByPeriod(req) {
    const { start, end } = req.params;
    const objs = await sequelize.query(
      "SELECT mechanics.fullName AS fullName, count(reservations.id) AS amount FROM reservations INNER JOIN mechanics ON reservations.mechanic_id = mechanics.id WHERE reservations.date > :start AND reservations.date < :end GROUP BY reservations.mechanic_id",
      {
        replacements: { start: start, end: end },
        type: QueryTypes.SELECT,
      }
    );
    return objs;
  }
}

export { ReservationService };
