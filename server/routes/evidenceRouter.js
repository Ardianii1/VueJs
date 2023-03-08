import express from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import evidenceController from "../controllers/evidenceController";
import EvidenceModel from "../models/EvidenceModel";
import createEvidenceSchema from "../validators/evidence/create";
const multer = require("multer");
const path = require("path");
const moment = require("moment");
const evidenceRouter = express.Router({ mergeParams: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "./uploads/evidences");
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

evidenceRouter.get("/", evidenceController.list);
evidenceRouter.get("/:evidenceId", evidenceController.find);
evidenceRouter.post("/create", async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("uploaded");
    }
    const {
      identifier,
      description,
      caseNumber,
      notes,
      storageLocation,
      handlingInstructions,
      photoName,
      createdBy,
      createdAt,
      status,
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
    const newEvidence = new EvidenceModel({
      identifier,
      description,
      caseNumber,
      notes,
      storageLocation,
      handlingInstructions,
      contentType: mimetype,
      photoName: photoNamee,
      createdBy,
      createdAt: formattedDate,
      status,
    });
    const validationResult = createEvidenceSchema.validate(newEvidence);
    if (validationResult.error) {
      if (!res.headersSent) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send({ message: "Bad Request" });
      }
    }
    newEvidence.save();
    return res.status(201);
  });
});
evidenceRouter.put("/:evidenceId", evidenceController.edit);
evidenceRouter.put("/transfer/:evidenceId", evidenceController.transfer);
evidenceRouter.put("/delete/:evidenceId", evidenceController.delete);

export default evidenceRouter;
