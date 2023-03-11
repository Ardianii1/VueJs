import express from "express";
import AccidentModel from "../models/AccidentModel";
import AccidentController from"../controllers/AccidentController"
const multer = require("multer");
const path = require("path");
const moment = require("moment");

const accidentRouter = express.Router({ mergeParams: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "./uploads/reports/accidents");
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

accidentRouter.get("/", AccidentController.list);
accidentRouter.get("/:accidentId", AccidentController.find);
accidentRouter.post("/create", async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("uploaded");
    }
    const {
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
    const { mimetype, buffer } = req.file;
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const photoNamee = `${day}${month}${year}_${hours}${minutes}_${req.file.originalname}`;
    const formattedDate = moment().format("MMMM D, YYYY hh:mm A");
      const newAccident = new AccidentModel({
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
    newAccident.save();
    return res.status(201);
  });
});
accidentRouter.put("/:accidentId", AccidentController.edit);
accidentRouter.put("/delete/:accidentId", AccidentController.delete);

export default accidentRouter;
