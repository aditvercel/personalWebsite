import mongoose from "mongoose";
let isConnected = false; // track the connection
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(
      "mongodb://adityamms:081277012300@ac-awfdiib-shard-00-00.dpc7e28.mongodb.net:27017,ac-awfdiib-shard-00-01.dpc7e28.mongodb.net:27017,ac-awfdiib-shard-00-02.dpc7e28.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjljew-shard-0&authSource=admin&retryWrites=true&w=majority",
      {
        dbName: "personalPortofolio",
      }
    );
    isConnected = true;
    console.log("MongoDB connected : personalPortofolio");
  } catch (error) {
    console.log(error);
  }
};
