import Mechanic from "./../models/Mechanic.js";

class MechanicService {
  static async findAll() {
    const objs = await Mechanic.findAll({
      include: { all: true, nested: true },
    });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await Mechanic.findByPk(id, {
      include: { all: true, nested: true },
    });
    return obj;
  }

  static async create(req) {
    const { fullName, cpf, login, password } = req.body;
    const obj = await Mechanic.create({
      fullName,
      cpf,
      login,
      password,
    });
    return await Mechanic.findByPk(obj.id, {
      include: { all: true, nested: true },
    });
  }

  static async update(req) {
    const { id } = req.params;
    const { fullName, cpf, login, password } = req.body;
    const obj = await Mechanic.findByPk(id, {
      include: { all: true, nested: true },
    });
    if (obj == null) throw "Mechanic not found!";
    Object.assign(obj, {
      fullName,
      cpf,
      login,
      password,
    });
    await obj.save();
    return await Mechanic.findByPk(obj.id, {
      include: { all: true, nested: true },
    });
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await Mechanic.findByPk(id);
    if (obj == null) throw "Mechanic not found!";
    try {
      await obj.destroy();
      return obj;
    } catch (error) {
      throw "It is not possible to delete this mechanic!";
    }
  }
}

export { MechanicService };
