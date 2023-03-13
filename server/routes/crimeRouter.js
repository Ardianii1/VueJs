import express from "express";
import CrimeModel from "../models/CrimeModel";
import CrimeController from"../controllers/CrimeController"
import createCrimeSchema from "../validators/crime/create";
const multer = require("multer");
const path = require("path");
const moment = require("moment");

const crimeRouter = express.Router({ mergeParams: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "./uploads/reports/crimes");
  },
  filename: function (req, file, cb) {
    console.log(req.body);
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const photoName = `${day}${month}${year}_${hours}${minutes}_${path.basename(
      file.originalname
    )}`;
    cb(null, photoName);
  },
});

const upload = multer({ storage: storage }).single("photo");

crimeRouter.get("/", CrimeController.list);
crimeRouter.get("/:crimeId", CrimeController.find);
crimeRouter.post("/create", async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("uploaded");
    }
    const {
      Type,
      Dateof,
      Locationn,
      Description,
      Suspects,
      ContactOfperson,
      photo,
      photoName,
      CreatedAt,
      Status,
    } = req.body;
      console.log(req.file.originalname);
    console.log(req.file);
    const { mimetype, buffer } = req.file;
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const photoNamee = `${day}${month}${year}_${hours}${minutes}_${req.file.originalname}`;
    const formattedDate = moment().format("MMMM D, YYYY hh:mm A");
      const newCrime = new CrimeModel({
        Type,
        Dateof,
        Locationn,
        Description,
        Suspects,
        ContactOfperson,
        contentType: mimetype,
        photoName: photoNamee,
        CreatedAt: formattedDate,
        Status,
      });
    const validationResult = createCrimeSchema.validate(newCrime);
    if (validationResult.error) {
      if (!res.headersSent) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send({ message: "Bad Request" });
      }
    }
    newCrime.save();
    return res.status(201);
  });
});
crimeRouter.put("/:crimeId", CrimeController.edit);
crimeRouter.put("/delete/:crimeId", CrimeController.delete);

export default crimeRouter;
