import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors"
import  swaggerUi  from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerOptions } from "../swagger/swagger.js";
import  route from "./routes/index";
dotenv.config();
const app = express();
app.use(cors())

const swaggerSpec = swaggerJSDoc(swaggerOptions);
const dbURI = process.env.DB_CONNECT;
mongoose.connect(dbURI, () => {
  console.log("Connected to db! ");
});

//!!Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//!!Route Middleware

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", route);
app.get("/", (req, res) => {
  return res.redirect("/api-docs");
});
app.use("/*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Not found",
  });
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
export default app;
