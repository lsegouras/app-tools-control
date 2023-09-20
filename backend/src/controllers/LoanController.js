import { LoanService } from "../services/LoanService.js";

class LoanController {
  static async findAll(req, res, next) {
    LoanService.findAll()
      .then((objs) => res.json(objs))
      .catch(next);
  }

  static async findByPk(req, res, next) {
    LoanService.findByPk(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async create(req, res, next) {
    LoanService.create(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async update(req, res, next) {
    LoanService.update(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async delete(req, res, next) {
    LoanService.delete(req)
      .then((obj) => res.json(obj))
      .catch(next);
  }

  static async findLoansTotalAndAmountOfMechanicsByPeriod(req, res, next) {
    LoanService.findLoansTotalAndAmountOfMechanicsByPeriod(req)
      .then((objs) => res.json(objs))
      .catch(next);
  }

  static async findByMechanic(req, res, next) {
    LoanService.findByMechanic(req)
      .then((objs) => res.json(objs))
      .catch(next);
  }

  static async findByMechanicAndPeriod(req, res, next) {
    LoanService.findByMechanicAndPeriod(req)
      .then((objs) => res.json(objs))
      .catch(next);
  }

  static async findTotalYearMonth(req, res, next) {
    LoanService.findTotalYearMonth()
      .then((objs) => res.json(objs))
      .catch(next);
  }
}

export { LoanController };
