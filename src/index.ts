import express from "express";
import routes from "./routes/index";

const app = express();

app.use("/", routes);
app.listen(3000, () => {
  console.log(`server started at localhost:3000`);
});

export default app;
