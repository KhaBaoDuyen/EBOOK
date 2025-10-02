import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/smartbook";

 declare global {
   var _mongoose: Promise<typeof mongoose> | undefined;
}

if (!global._mongoose) {
  global._mongoose = mongoose.connect(MONGODB_URI, { dbName: "smartbook" });
}

export default global._mongoose;
