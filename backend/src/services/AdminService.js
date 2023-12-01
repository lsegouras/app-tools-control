import Admin from "./../models/Admin.js";

class AdminService {

  static async findByLogin(login, password) {
    try {
      const verifyLogin = await Admin.findOne({
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
    const { login, password } = req.body;
    console.log(login, password);
    const obj = await Admin.create({
      login,
      password,
    });
    return await Admin.findByPk(obj.id, {
      include: { all: true, nested: true },
    });
  }

 
}

export { AdminService };
