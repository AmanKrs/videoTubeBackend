import { app } from "./app.js";
// const app = require("./app");
import { connectDB } from "./db/database.js";
import "dotenv/config"; //if .env files are in root folder

// import dotenv from 'dotenv'; // uses if .env file are present in different folder

// below uses for setting path of .env files
// dotenv.config({
//   path: "./.env",
// });

const port = process.env.PORT;

// connectDB();

// app.listen(port, (err) => {
//   if (err) {
//     console.log("server has some problem in starting");
//   }
//   console.log(`server start at ${port}`);
// });

connectDB()
  .then(() => {
    app.listen(port, (err) => {
      if (err) {
        console.log("server has some problem in starting");
      }
      console.log(`server start at ${port}`);
    });
  })
  .catch((err) => {
    console.log(`MongoDB connection issue`);
  });
