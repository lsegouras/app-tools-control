import { Model, DataTypes } from "sequelize";

class Tool extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: { msg: "Tool's name must be filled!" },
            len: {
              args: [2, 50],
              msg: "Tool's name must have between 2 to 50 letters!",
            },
          },
        },
        description: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: { msg: "Tool's description must be filled!" },
            len: {
              args: [5, 100],
              msg: "Tool's description must have between 5 to 100 letters!",
            },
          },
        },
        available: {
          type: DataTypes.BOOLEAN,
          validate: {
            notEmpty: {
              msg: "Information about availability must be filled!",
            },
          },
        },
      },
      { sequelize, modelName: "tool", tableName: "tools" }
    );
  }
}

export default Tool;
