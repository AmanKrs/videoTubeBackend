// const mongoose = require("mongoose");
import mongoose from "mongoose";
import "dotenv/config";
import { DB_NAME, DB_STRING } from "../constants.js";

const DB_URL = `${DB_STRING}/${DB_NAME}`;

const connectDB = async () => {
  try {
    const connectionHost = await mongoose.connect(DB_URL);
    console.log(`db connected with host '${connectionHost.connection.host}'`);
  } catch (e) {
    console.log("DB_ERROR:", e.message);
    process.exit(1);
  }
};

export { connectDB };
