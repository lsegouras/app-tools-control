import { Model, DataTypes } from "sequelize";

class LoanItem extends Model {
  static init(sequelize) {
    super.init(
      {
        delivery: {
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
      },
      { sequelize, modelName: "loanItem", tableName: "loanItems" }
    );
  }

  static associate(models) {
    this.removeAttribute("id");
    this.belongsTo(models.loan, { foreignKey: "loanId" });
    this.belongsTo(models.tool, { foreignKey: "toolId" });
  }
}

export default LoanItem;
