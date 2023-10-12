import { MechanicService } from "../services/MechanicService.js";

class MechanicController {
  static async findAll(req, res, next) {
    MechanicService.findAll()
      .then((objs) => res.json(objs))
      .catch(next);
  }

  static async findByPk(req, res, next) {
    MechanicService.findByPk(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async create(req, res, next) {
    MechanicService.create(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async update(req, res, next) {
    MechanicService.update(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async delete(req, res, next) {
    MechanicService.delete(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async login(req, res, next) {
    MechanicService.login(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }
}

export { MechanicController };
