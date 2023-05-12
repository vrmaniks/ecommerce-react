const mongoose = require("mongoose");


const connected = async () => {
  const connection = .ENV.connectionString

  console.log("DB connected");
  return connection;
}

module.exports = connected;





