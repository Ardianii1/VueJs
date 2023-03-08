import express from "express";
import caseController from "../controllers/caseController";
import CaseModel from "../models/CaseModel";
const multer = require("multer");
const path = require("path");
const moment = require("moment");

const caseRouter = express.Router({ mergeParams: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "./uploads/cases");
  },
  filename: function (req, file, cb) {
    console.log(req.body);
    // const fileName = path.basename(file.originalname);
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

caseRouter.get("/", caseController.list);
caseRouter.get("/:caseId", caseController.find);
caseRouter.post("/create", async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("uploaded");
    }
    const {
      casenumber,
      dateof,
      location,
      description,
      parties,
      status,
      notes,
      photoName,
      createdAt,
      createdBy,
      deleted,
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
    const newCase = new CaseModel({
      casenumber,
      dateof,
      description,
      notes,
      location,
      parties,
      photo: { contentType: mimetype, data: buffer },
      photoName: photoNamee,
      createdBy,
      createdAt: formattedDate,
      status,
      deleted,
    });
    newCase.save();
    return res.status(201);
  });
});
caseRouter.put("/:caseId", caseController.edit);
caseRouter.put("/transfer/:caseId", caseController.transfer);
caseRouter.put("/delete/:caseId", caseController.delete);

export default caseRouter;
