const mongoose = require("mongoose");

//connect to DB

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado ao banco de dados 🎲");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao banco de dados 😭");
    console.log(err);
  });

module.exports = mongoose;
