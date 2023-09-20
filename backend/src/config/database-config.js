// Configuração do banco de dados no ambiente de desenvolvimento
export const databaseConfig = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "postgres",
  database: "tools-app-database",
  define: {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
  },
};
