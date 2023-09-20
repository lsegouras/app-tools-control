import { Model, DataTypes } from "sequelize";

class Devolution extends Model {
  static init(sequelize) {
    super.init(
      {
        date: {
          type: DataTypes.DATEONLY,
          validate: {
            isDate: {
              msg: "Devolution date must follow the pattern yyyy-mm-dd!",
            },
          },
        },
      },
      { sequelize, modelName: "devolution", tableName: "devolutions" }
    );
  }

  static associate(models) {
    this.belongsTo(models.loan, { foreignKey: "loanId" });
    this.belongsTo(models.tool, { foreignKey: "toolId" });
  }
}

export default Devolution;
