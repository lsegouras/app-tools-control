import Tool from "./../models/Tool.js";

import sequelize from "../config/database-connection.js";
import { QueryTypes } from "sequelize";

class ToolService {
  static async findAll() {
    const objs = await Tool.findAll({
      include: { all: true, nested: true },
    });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await Tool.findByPk(id, {
      include: { all: true, nested: true },
    });
    return obj;
  }

  static async create(req) {
    const { name, description, available } = req.body;
    const obj = await Tool.create({ name, description, available });
    return await Tool.findByPk(obj.id, {
      include: { all: true, nested: true },
    });
  }

  static async update(req) {
    const { id } = req.params;
    const { name, description, available } = req.body;
    const obj = await Tool.findByPk(id, {
      include: { all: true, nested: true },
    });
    if (obj == null) throw "Tool not found!";
    Object.assign(obj, {
      name,
      description,
      available,
    });
    await obj.save();
    return await Tool.findByPk(obj.id, {
      include: { all: true, nested: true },
    });
  }

  static async updateStatus(req) {
    const { id } = req.params;
    const { available } = req.body;
    if (available == null) throw "The tool'availability must be filled!";
    const obj = await Tool.findByPk(id, {
      include: { all: true, nested: true },
    });
    if (obj == null) throw "Tool not found!";
    Object.assign(obj, {
      available,
    });
    await obj.save();
    return await Tool.findByPk(obj.id, {
      include: { all: true, nested: true },
    });
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await Tool.findByPk(id);
    if (obj == null) throw "Tool not found!";
    try {
      await obj.destroy();
      return obj;
    } catch (error) {
      throw "It is not possible to delete this tool!";
    }
  }

  static async findByAvailable(req) {
    const { available } = req.params;
    const objs = await Tool.findAll({
      where: { available: available },
    });
    return objs;
  }

  static async findByIdAndAvailable(id, disponivel) {
    const objs = await Tool.findAll({
      where: { id: id, available: available },
    });
    return objs;
  }
}

export { ToolService };
