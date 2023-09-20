import { ToolService } from "../services/ToolService.js";

class ToolController {
  static async findAll(req, res, next) {
    ToolService.findAll()
      .then((objs) => res.json(objs))
      .catch(next);
  }

  static async findByPk(req, res, next) {
    ToolService.findByPk(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async create(req, res, next) {
    ToolService.create(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async update(req, res, next) {
    ToolService.update(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async updateStatus(req, res, next) {
    ToolService.updateStatus(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async delete(req, res, next) {
    ToolService.delete(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async findByAvailable(req, res, next) {
    ToolService.findByAvailable(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }
}

export { ToolController };
