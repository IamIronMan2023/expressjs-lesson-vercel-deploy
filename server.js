import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import employeeRoutes from "./routes/employeeRoute.js";
import userRoutes from "./routes/userRoutes.js";
import logger from "./middlewares/logger.js";

//Start creating app
const app = express();

//Mongoose connection

// mongoose.connect(process.env.HOST + process.env.DB, { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on("error", (error) => console.log(error));
// db.once("open", () => console.log("Connected to database..."));

//recommended because it waits for database to connect
try {
  await mongoose.connect(process.env.HOST + process.env.DB, {
    useNewUrlParser: true,
  });
  console.log("Connected to database...");
} catch (error) {
  console.log(error);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
  //res.status(500).send("Hello World!");
  //Default is 200
  //res.json({ message: "Hello", sender: "Juan Dela Cruz" });
});

//------- Middlewares
//custom logger middleware
// app.use(logger);

//allows server to accept json
app.use(express.json());
//post will error without this middleware
app.use(express.urlencoded({ extended: false }));

//enable cors
app.use(cors());
app.use("/api/employees", employeeRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
