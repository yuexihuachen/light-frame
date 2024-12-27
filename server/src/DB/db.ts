import mongoose from "mongoose";

export default function connectDB() {
  const url: string = Bun.env.MONGO_URI || '';
  console.log(url)
  try {
    mongoose.connect(url);
  } catch (err) {
    console.log(`Database connect erro: ${err}`);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_: any) => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err: any) => {
    console.error(`connection error: ${err}`);
  });
  return;
}