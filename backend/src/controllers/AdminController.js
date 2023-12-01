import { AdminService } from "../services/AdminService.js";

class AdminController {
  
  static async create(req, res, next) {
    console.log(req.body);
    AdminService.create(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async login(req, res, next) {
    AdminService.login(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }
}

export { AdminController };
