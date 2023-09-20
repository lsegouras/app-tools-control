import { ReservationService } from "../services/ReservationService.js";

class ReservationController {
  static async findAll(req, res, next) {
    ReservationService.findAll()
      .then((objs) => res.json(objs))
      .catch(next);
  }

  static async findByPk(req, res, next) {
    ReservationService.findByPk(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async create(req, res, next) {
    ReservationService.create(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async update(req, res, next) {
    ReservationService.update(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async updateStatus(req, res, next) {
    ReservationService.updateStatus(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async delete(req, res, next) {
    ReservationService.delete(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async findByToolAndStatus(req, res, next) {
    ReservationService.findByToolAndStatus(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async findByMechanicAndPeriod(req, res, next) {
    ReservationService.findByMechanicAndPeriod(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async findAmountOfReservationssOfMechanicsByPeriod(req, res, next) {
    ReservationService.findAmountOfReservationssOfMechanicsByPeriod(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }
}

export { ReservationController };
