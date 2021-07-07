import route from "./convert";
import express from "express";
const routes = express.Router();

routes.use("/convert", route);

export default routes;
