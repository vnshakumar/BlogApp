const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://vnshakumar:Avinash_12345@cluster0.ewljq.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0";

const connectDb = async () => {
  const connection = await mongoose.connect(MONGO_URI);
  if(connection) console.log("Database connected");
  else console.log("Database connection failed");
};

module.exports = { connectDb };
