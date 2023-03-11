import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import {
  API_PORT,
  MONGO_CONNECTION_URI,
  MONGO_DB_NAME,
  MONGO_DB_PORT,
} from "./config";
// import categoryRouter from "./routes/categoriesRouter";
// import postRouter from "./routes/postRouter";
// import userRouter from "./routes/userRouter";
import caseRouter from "./routes/caseRouter";
import evidenceRouter from "./routes/evidenceRouter";
import userRouter from "./routes/userRouter"
import crimeRouter from "./routes/crimeRouter";
import accidentRouter from "./routes/accidentRouter";
import emergencyRouter from "./routes/emergencyRouter";
const multer = require("multer");
const path = require("path");

mongoose
  .connect(`${MONGO_CONNECTION_URI}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`)
  .then(() => {
    console.log(`Connected to mongodb on port ${MONGO_DB_PORT}`);
    const app = express();
    app.use(cors({ origin: "*", }));
    
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        console.log(file);
        cb(null, "./uploads");
      },
      filename: function (req, file, cb) {
        console.log(file);
        // const fileName = path.basename(file.originalname);
        cb(null, Date.now() + file.originalname);
      },
    });

    // const upload = multer({ storage: storage }).single("photo");
    app.use(express.static("public"));
    app.get("/uploads/evidences/:filename", (req, res) => {
      const filename = req.params.filename;
      res.sendFile(path.join(__dirname, "uploads/evidences", filename)); // Serve the photo file from the uploads folder
    });
    app.get("/uploads/cases/:filename", (req, res) => {
      const filename = req.params.filename;
      res.sendFile(path.join(__dirname, "uploads/cases", filename)); // Serve the photo file from the uploads folder
    });
    app.get("/uploads/reports/crimes/:filename", (req, res) => {
      const filename = req.params.filename;
      res.sendFile(path.join(__dirname, "uploads/reports/crimes", filename)); // Serve the photo file from the uploads folder
    });
    app.get("/uploads/reports/accidents/:filename", (req, res) => {
      const filename = req.params.filename;
      res.sendFile(path.join(__dirname, "uploads/reports/accidents", filename)); // Serve the photo file from the uploads folder
    });
    app.get("/uploads/reports/emergencies/:filename", (req, res) => {
      const filename = req.params.filename;
      res.sendFile(path.join(__dirname, "uploads/reports/emergencies", filename)); // Serve the photo file from the uploads folder
    });
    app.use("/users", userRouter);
    app.use("/cases", caseRouter);
    app.use("/evidences", evidenceRouter);
    app.use("/crimes", crimeRouter);
    app.use("/accidents", accidentRouter);
    app.use("/emergencys", emergencyRouter);
    app.get("*", (req, res) => res.status(404).json({ content: "not_found" }));

    app.listen(API_PORT, () => {
      console.log(`Server Api listening on port: ${API_PORT}`);
    });
  });
