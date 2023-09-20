import { Model, DataTypes } from "sequelize";

class Reservation extends Model {
  static init(sequelize) {
    super.init(
      {
        date: {
          type: DataTypes.DATEONLY,
          validate: {
            isDate: {
              msg: "Loan item delivery date must be filled!",
            },
            is: {
              args: ["[0-9]{4}-[0-9]{2}-[0-9]{2}"],
              msg: "Loan item delivery date must follow the pattern yyyy-mm-dd!",
            },
          },
        },
        status: {
          type: DataTypes.ENUM("0", "1", "2"),
          defaultValue: "0",
          validate: {
            isIn: {
              args: [["0", "1", "2"]], // // 0 – Not Reserved / 1 – Reserved / 2 - In Use
              msg: "Reservation status must be 0 (not reserved), 1 (reserved) or 2 (in use)",
            },
          },
        },
      },
      { sequelize, modelName: "reservation", tableName: "reservations" }
    );
  }

  static associate(models) {
    this.belongsTo(models.mechanic, { foreignKey: "mechanicId" });
    this.belongsTo(models.tool, { foreignKey: "toolId" });
  }
}

export default Reservation;
