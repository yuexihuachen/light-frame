import mongoose from "mongoose";

export default function connectDB() {
  let url: string = Bun.env["MONGO_URI"] || '';
  if (Bun.env.NODE_ENV === 'development') {
    url = "mongodb://localhost:27017/notesDB"
  }
  try {
    mongoose.connect(url);
  } catch (err) {
    process.exit(1);
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