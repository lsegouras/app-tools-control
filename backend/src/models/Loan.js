import { Model, DataTypes } from "sequelize";

class Loan extends Model {
  static init(sequelize) {
    super.init(
      {
        date: {
          type: DataTypes.DATEONLY,
          validate: {
            isDate: {
              msg: "Loan date must follow the pattern yyyy-mm-dd!",
            },
          },
        },
      },
      { sequelize, modelName: "loan", tableName: "loans" }
    );
  }

  static associate(models) {
    this.belongsTo(models.mechanic, {
      as: "mechanic",
      foreignKey: "mechanicId",
    });
    this.hasMany(models.loanItem, {
      as: { singular: "item", plural: "items" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}

export default Loan;
