import express from "express";
import EmergencyModel from "../models/EmergencyModel";
import EmergencyController from "../controllers/EmergencyController"
import createEmergencySchema from "../validators/emergency/create";
const multer = require("multer");
const path = require("path");
const moment = require("moment");

const emergencyRouter = express.Router({ mergeParams: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "./uploads/reports/emergencies");
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

emergencyRouter.get("/", EmergencyController.list);
emergencyRouter.get("/:emergencyId", EmergencyController.find);
emergencyRouter.post("/create", async (req, res) => {
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
      Injuries,
      ContactOfperson,
      photo,
      photoName,
      CreatedAt,
      Status,
    } = req.body;
      console.log(req.file.originalname);
    console.log(req.file)
    const { mimetype, buffer } = req.file;
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const photoNamee = `${day}${month}${year}_${hours}${minutes}_${req.file.originalname}`;
    const formattedDate = moment().format("MMMM D, YYYY hh:mm A");
      const newEmergency = new EmergencyModel({
        Type,
        Dateof,
        Locationn,
        Description,
        Injuries,
        ContactOfperson,
        contentType: mimetype,
        photoName: photoNamee,
        CreatedAt: formattedDate,
        Status,
      });
    const validationResult = createEmergencySchema.validate(newEmergency);
    if (validationResult.error) {
      if (!res.headersSent) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send({ message: "Bad Request" });
      }
    }
    newEmergency.save();
    return res.status(201);
  });
});
emergencyRouter.put("/:emergencyId", EmergencyController.edit);
emergencyRouter.put("/delete/:emergencyId", EmergencyController.delete);

export default emergencyRouter;
