import { DevolutionService } from "../services/DevolutionService.js";

class DevolutionController {
  static async findAll(req, res, next) {
    DevolutionService.findAll()
      .then((objs) => res.json(objs))
      .catch(next);
  }

  static async findByPk(req, res, next) {
    DevolutionService.findByPk(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async create(req, res, next) {
    DevolutionService.create(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async update(req, res, next) {
    DevolutionService.update(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async delete(req, res, next) {
    DevolutionService.delete(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async findByMechanicAndPeriod(req, res, next) {
    DevolutionService.findByMechanicAndPeriod(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async findAmountDevolutionMechanicByPeriod(req, res, next) {
    DevolutionService.findAmountDevolutionMechanicByPeriod(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }
}

export { DevolutionController };
