import { Model, DataTypes } from "sequelize";

class Admin extends Model {
  static init(sequelize) {
    super.init(
      {
        login: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: { msg: "Admin's login must be filled!" },
            len: {
              args: [2, 20],
              msg: "Admin's login must have between 2 to 20 characters!",
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: { msg: "Admin's password must be filled!" },
            len: {
              args: [6, 10],
              msg: "Admin's password must have between 6 to 10 characters!",
            },
          },
        },
      },
      { sequelize, modelName: "admin", tableName: "admins" }
    );
  }
}
export default Admin;
