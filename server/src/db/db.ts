import mongoose from "mongoose";

export default function connectDB() {
  const url: string = process.env.MONGO_URI || "";
  try {
    mongoose.connect(url);
  } catch (err) {
    process.exit(1);
  }
  const dbConnection = mongoose.connection;

  dbConnection.once("open", (data: any) => {
    console.log(`Database success connected: ${url}`);
  });

  dbConnection.on("error", (err: any) => {
    console.error(`connection error: ${err}`);
  });
  return;
}
