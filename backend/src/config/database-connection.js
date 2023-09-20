import { Sequelize } from "sequelize";
import { databaseConfig } from "./database-config.js";

import Mechanic from "../models/Mechanic.js";
import Tool from "../models/Tool.js";
import Devolution from "../models/Devolution.js";
import LoanItem from "../models/LoanItem.js";
import Loan from "../models/Loan.js";
import Reservation from "../models/Reservation.js";

const sequelize = new Sequelize(databaseConfig);

Mechanic.init(sequelize);
Tool.init(sequelize);
Devolution.init(sequelize);
LoanItem.init(sequelize);
Loan.init(sequelize);
Reservation.init(sequelize);

// Mechanic.associate(sequelize.models);
// Tool.associate(sequelize.models);
// Devolution.associate(sequelize.models);
// LoanItem.associate(sequelize.models);
// Loan.associate(sequelize.models);
Reservation.associate(sequelize.models);
Devolution.associate(sequelize.models);
Loan.associate(sequelize.models);
LoanItem.associate(sequelize.models);

databaseInserts();

function databaseInserts() {
  (async () => {
    await sequelize.sync({ force: true });

    const mechanic1 = await Mechanic.create({
      fullName: "João Silva",
      cpf: "111.111.111-11",
      login: "joaosilva",
      password: "123456",
    });
    const mechanic2 = await Mechanic.create({
      fullName: "José Lima",
      cpf: "222.222.222-22",
      login: "joselima",
      password: "123456",
    });

    const tool1 = await Tool.create({
      name: "Screwdriver",
      description: "screwdriver with green handle",
      available: "true",
    });
    const tool2 = await Tool.create({
      name: "Hammer",
      description: "big hammer with wood handle",
      available: "true",
    });
    const tool3 = await Tool.create({
      name: "Hydraulic Jack",
      description: "black hydrulic jack",
      available: "true",
    });

    const loan1 = await Loan.create({
      date: "2023-04-10",
      mechanicId: mechanic1.id,
    });
    const loan2 = await Loan.create({
      date: "2023-04-13",
      mechanicId: mechanic2.id,
    });

    const loanItem1 = await LoanItem.create({
      loanId: loan1.id,
      toolId: tool1.id,
      date: "2023-04-11",
    });
    const loanItem2 = await LoanItem.create({
      loanId: loan1.id,
      toolId: tool2.id,
      date: "2023-04-12",
    });
    const loanItem3 = await LoanItem.create({
      loanId: loan2.id,
      toolId: tool3.id,
      date: "2023-04-16",
    });

    const devolution1 = await Devolution.create({
      loanId: loan1.id,
      toolId: tool1.id,
      delivery: "2023-04-12",
    });
    const devolution2 = await Devolution.create({
      loanId: loan1.id,
      fitaId: tool2.id,
      delivery: "2023-04-12",
    });

    const reservation1 = await Reservation.create({
      mechanicId: mechanic1.id,
      toolId: tool1.id,
      date: "2023-04-13",
      status: 1,
    });
  })();
}

export default sequelize;
