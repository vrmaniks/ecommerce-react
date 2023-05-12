const mongoose = require("mongoose");


const connected = async () => {
  const connection = await mongoose.connect('mongodb+srv://vrmaniks:niks2812000@cluster0.tjqqp1o.mongodb.net/?retryWrites=true&w=majority');

  console.log("DB connected");
  return connection;
}

module.exports = connected;





