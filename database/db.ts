import mongoose, { mongo } from "mongoose";

//connect to DB
const mongoUri = process.env.MONGO_URI ?? "";
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Conectado ao banco de dados 🎲");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao banco de dados 😭");
    console.log(err);
  });

export default mongoose;
