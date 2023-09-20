import express from "express";
import routes from "./src/routes/Routes.js";
import errorHandler from "./src/_middleware/error-handler.js";
import cors from "cors";
import sequelize from "./src/config/database-connection.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);
app.use(errorHandler);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
