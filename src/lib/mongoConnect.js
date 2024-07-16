import mongoose from "mongoose";

const ConnectMongoDb = async () => {
  const connection = {};
  try {
    if (connection.isConnected) {
      return;
    }
    const db = await mongoose.connect(process.env.MONGODB_URL);
    connection.isConnected = db.connections[0].readyState;

    console.log("MongoDB connected", db.connection.host, db.connection.name);
  } catch (error) {
    console.log(error);
  }
};
export default ConnectMongoDb;
