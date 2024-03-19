import express, { Request, Response } from "express";

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

// default route
app.all("*", (req: Request, res: Response) => {
  res
    .status(404)
    .send(
      "Hello, there. That's a empty route. You must check docs in <a href='https://github.com/hicarop4/jwt-auth'>https://github.com/hicarop4/jwt-auth</a> to make sure where to go."
    );
});

// start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server rodando 🔥");
});
