import { Model, DataTypes } from "sequelize";

class Mechanic extends Model {
  static init(sequelize) {
    super.init(
      {
        fullName: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: { msg: "Mechanic's full name must be filled!" },
            len: {
              args: [6, 50],
              msg: "Mechanic's full name must have between 6 to 50 letters!",
            },
          },
        },
        cpf: {
          type: DataTypes.STRING,
          unique: true,
          validate: {
            notEmpty: { msg: "Mechanic's CPF must be filled!" },
            is: {
              args: ["[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}"],
              msg: "Mechanic's CPF must have the following pattern NNN.NNN.NNN-NN!",
            },
          },
        },
        login: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: { msg: "Mechanic's login must be filled!" },
            len: {
              args: [2, 20],
              msg: "Mechanic's login must have between 2 to 20 characters!",
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: { msg: "Mechanic's password must be filled!" },
            len: {
              args: [6, 10],
              msg: "Mechanic's password must have between 6 to 10 characters!",
            },
          },
        },
      },
      { sequelize, modelName: "mechanic", tableName: "mechanics" }
    );
  }
}
export default Mechanic;
