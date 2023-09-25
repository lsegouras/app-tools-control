import express from "express";

import { MechanicController } from "../controllers/MechanicController.js";
import { ToolController } from "../controllers/ToolController.js";
import { LoanController } from "../controllers/LoanController.js";
import { DevolutionController } from "../controllers/DevolutionController.js";
import { ReservationController } from "../controllers/ReservationController.js";

const routes = express.Router();

//MECHANICS ROUTES
routes.get("/mechanics", MechanicController.findAll);
routes.get("/mechanics/:id", MechanicController.findByPk);
routes.post("/mechanics", MechanicController.create);
routes.put("/mechanics/:id", MechanicController.update);
routes.delete("/mechanics/:id", MechanicController.delete);

//TOOLS ROUTES
routes.get("/tools", ToolController.findAll);
routes.get("/tools/:id", ToolController.findByPk);
routes.post("/tools", ToolController.create);
routes.put("/tools/:id", ToolController.update);
routes.put("/toolStatus/:id", ToolController.updateStatus);
routes.delete("/tools/:id", ToolController.delete);
routes.get("/tools/findByAvailable/:available", ToolController.findByAvailable);

//LOANS ROUTES
routes.get("/loans", LoanController.findAll);
routes.get("/loans/:id", LoanController.findByPk);
routes.post("/loans", LoanController.create);
routes.put("/loans/:id", LoanController.update);
routes.delete("/loans/:id", LoanController.delete);
routes.get(
  "/loans/findLoansTotalAndAmountOfMechanicsByPeriod/:start/:end",
  LoanController.findLoansTotalAndAmountOfMechanicsByPeriod
);
routes.get("/loans/findByMechanic/:mechanicId", LoanController.findByMechanic);
routes.get(
  "/loans/findByMechanicAndPeriod/:mechanicId/:start/:end",
  LoanController.findByMechanicAndPeriod
);
routes.get("/loans/findTotalYearMonth", LoanController.findTotalYearMonth);

//RESERVATIONS ROUTES
routes.get("/reservations", ReservationController.findAll);
routes.get("/reservations/:id", ReservationController.findByPk);
routes.post("/reservations", ReservationController.create);
routes.put("/reservations/:id", ReservationController.update);
routes.put("/reservationStatus/:id", ReservationController.updateStatus);
routes.delete("/reservations/:id", ReservationController.delete);
routes.get(
  "/reservations/findByTool/:toolId",
  ReservationController.findByTool
);
routes.get(
  "/reservations/findByMechanic/:mechanicId",
  ReservationController.findByMechanic
);
routes.get(
  "/reservations/findAmountOfReservationssOfMechanicsByPeriod/:start/:end",
  ReservationController.findAmountOfReservationssOfMechanicsByPeriod
);

//DEVOLUTIONS ROUTES
routes.get("/devolutions", DevolutionController.findAll);
routes.get("/devolutions/:loanId/:toolId", DevolutionController.findByPk);
routes.post("/devolutions", DevolutionController.create);
routes.put("/devolutions/:loanId/:toolId", DevolutionController.update);
routes.delete("/devolutions/:loanId/:toolId", DevolutionController.delete);
routes.get(
  "/devolutions/findByMechanicAndPeriod/:mechanicId/:start/:end",
  DevolutionController.findByMechanicAndPeriod
);
routes.get(
  "/devolutions/findAmountDevolutionMechanicByPeriod/:start/:end",
  DevolutionController.findAmountDevolutionMechanicByPeriod
);

export default routes;
