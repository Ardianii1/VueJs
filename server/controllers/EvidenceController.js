import { ReasonPhrases, StatusCodes } from "http-status-codes";
import EvidenceModel from "../models/EvidenceModel";
import createEvidenceSchema from "../validators/evidence/create";
import updateEvidenceSchema from "../validators/evidence/update";
import TransferedEvidenceModel from "../models/TransferedEvidenceModel";
const moment = require("moment");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "../uploads/evidences");
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

const controller = {
  list: async (req, res) => {
    try {
      const list = await EvidenceModel.find({ status: "visible" });
      return res.json(list);
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
    }
  },
  find: async (req, res) => {
    try {
      const evidence = await EvidenceModel.findOne({
        _id: req.params.evidenceId,
      });

      if (!evidence) throw Error("Evidence not found");
      return res.json(evidence);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  edit: async (req, res) => {
    const validationResult = updateEvidenceSchema.validate(req.body);
    if (validationResult.error) {
      if (!res.headersSent) {
        res.setHeader("Content-Type", "application/json");
      }
    }
    try {
      console.log(req.body);

      await EvidenceModel.updateOne({ _id: req.params.evidenceId }, req.body);

      const updatedEvidence = await EvidenceModel.find({
        _id: req.params.evidenceId,
      });

      return res.json(updatedEvidence);
    } catch (err) {
      if (!res.headersSent) {
        res.setHeader("Content-Type", "application/json");
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: ReasonPhrases.UNAUTHORIZED,
          error: validationResult.error.message,
        });
      }
    }
  },
  transfer: async (req, res) => {
    const evidenceId = req.params.evidenceId;
    const newOfficer = req.body.newOfficer;
    const createdBy = req.body.createdBy;
    const update = { ...req.body };
    console.log(update);
    const formattedDate = moment().format("MMMM D, YYYY hh:mm A");

    try {
      await EvidenceModel.updateOne(
        { _id: req.params.evidenceId },
        { ...req.body, createdBy: newOfficer }
      );

      const updatedEvidence = await EvidenceModel.find({
        _id: req.params.evidenceId,
      });

      if (!updatedEvidence) {
        return res.status(404).send({ message: "Evidence not found" });
      }

      const transferredEvidence = new TransferedEvidenceModel({
        transferDate: formattedDate,
        transferedFrom: createdBy,
        transferedTo: newOfficer,
        caseNumber: evidenceId,
        transferNotes: req.body.transferNotes,
      });

      await transferredEvidence.save();

      res.send({ message: "Case transferred successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error" });
    }
  },
  delete: async (req, res) => {
    const evidenceId = req.params.evidenceId;
    const status = "hidden";

    try {
      const updatedEvidence = await EvidenceModel.findByIdAndUpdate(
        evidenceId,
        { status },
        { new: true }
      );
      res.status(200).send(updatedEvidence);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
    // const evidenceId = req.params.evidenceId;
    // const { fileName } = req.body;
    // console.log(fileName)
    // async function deleteFile(filePath) {
    //   try {
    //     await fs.promises.unlink(filePath);
    //     console.log(`File ${filePath} deleted successfully.`);
    //   } catch (error) {
    //     console.error(`Error deleting file ${filePath}:`, error);
    //   }
    // fs.stat(filePath, (err, stats) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }

    //   if (stats.isFile()) {
    //     console.log("File exists");
    //   } else if (stats.isDirectory()) {
    //     console.log("Directory exists");
    //   } else {
    //     console.log("Path exists, but is neither a file nor a directory");
    //   }
    // });
    // }
    // const filePath =
    // "D:/Arlinda/Bro/UBT-CSE/Semestri5/Zhvillimi dhe Dizajnimi i Ueb/Vue-projekte/Projekt-clone/uploads/evidences/" + fileName;

    // try {
    //   await deleteFile(filePath);
    //   await EvidenceModel.deleteOne({ _id: evidenceId });
    //   res.json({ deleted: true });
    // } catch (err) {
    //   res
    //     .status(StatusCodes.NOT_FOUND)
    //     .json({ message: ReasonPhrases.NOT_FOUND });
    // }
  },
};

export default controller;
