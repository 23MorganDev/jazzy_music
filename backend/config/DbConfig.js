import mongoose from "mongoose";

const DBConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_CONNECTION_URL);
    console.log("DATABASE CONNECTED SUCCESSFULLY", connection.connection.name);
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); 
  }
};

export default DBConnect;
