const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// initialize express
const app = express();

// initialize dotenv
dotenv.config();

//connect to DB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log("Conectado ao banco de dados.");
});

// import routes
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");

// middlewares
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

app.listen(3000, () => {
  console.log("Server rodando 🔥");
});
