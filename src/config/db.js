import mongoose from "mongoose";
 
export function connectDB() {
  const url = "mongodb+srv://truongduong:i61bDP9CYMX64Zbf@cluster0.vzskkqc.mongodb.net/?retryWrites=true&w=majority";
 
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });
 
  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}