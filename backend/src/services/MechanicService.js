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

  static async findByLogin(login, password) {
    try {
      const verifyLogin = await Mechanic.findOne({
        where: { login: login, password: password },
      });
      if (!verifyLogin) {
        throw new Error("Invalid Login!");
      }
      return verifyLogin;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async login(req) {
    const { login, password } = req.body;
    const verifyLogin = await this.findByLogin(login, password);
    return verifyLogin;
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
