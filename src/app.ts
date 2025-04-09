import express from "express";
import AdminRouter from "./routes/admin";
import UserRouter from "./routes/user";
import CardRouter from "./routes/card";
import BoardRouter from "./routes/board";

const app = express();
const PORT = 3000;

app.use("/api/admin", AdminRouter);
app.use("/api/user", UserRouter);
app.use("/api/card", CardRouter);
app.use("/api/board", CardRouter);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
