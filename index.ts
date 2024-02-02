import express from "express";

// initialize express
const app = express();

// initialize dotenv
import dotenv from "dotenv";
dotenv.config();

// connect to db
import "./database/db";

// import routes
import authRouter from "./routes/auth";
import usersRouter from "./routes/users";

// middlewares
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

// start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server rodando 🔥");
});
