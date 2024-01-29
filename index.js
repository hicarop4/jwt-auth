const express = require("express");

// initialize express
const app = express();

// initialize dotenv
require("dotenv").config();

// connect to db
require("./database/db");

// import routes
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");

// middlewares
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server rodando 🔥");
});
