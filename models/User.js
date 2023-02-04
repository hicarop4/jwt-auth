const mongoose = require("mongoose");

// criando a estrutura que vou usar para o usuário
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// criando o modelo
const User = mongoose.model("User", userSchema);

// função que pega todos usuários
const getUsers = async () => {
  try {
    const users = await User.find({}).select("name email date -_id");
    return users;
  } catch (error) {
    console.error(error);
  }
};

// exportando o modelo e a função para pegar todos usuários
module.exports = {
  User,
  getUsers,
};
