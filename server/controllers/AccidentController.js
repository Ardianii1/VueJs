import { ReasonPhrases, StatusCodes } from "http-status-codes";
import AccidentModel from "../models/AccidentModel";
import createAccidentSchema from "../validators/accident/create";
import updateAccidentSchema from "../validators/accident/update";
const moment = require("moment");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "../uploads/reports/accidents");
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
      const list = await AccidentModel.find({ Status: "visible" });
      return res.json(list);
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
    }
  },
//   transfered: async (req, res) => {
//     try {
//       const list = await TransferedAccidentModel.find({ status: "visible" });
//       return res.json(list);
//     } catch (err) {
//       res
//         .status(StatusCodes.INTERNAL_SERVER_ERROR)
//         .json({ error: err.message });
//     }
//   },
  find: async (req, res) => {
    try {
      const accident = await AccidentModel.findOne({
        _id: req.params.accidentId,
      });

      if (!accident) throw Error("Accident not found");
      return res.json(accident);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  edit: async (req, res) => {
    const validationResult = updateAccidentSchema.validate(req.body);
    if (validationResult.error) {
      if (!res.headersSent) {
        res.setHeader("Content-Type", "application/json");
      }
    }
    try {
      console.log(req.body);

      await AccidentModel.updateOne({ _id: req.params.accidentId }, req.body);

      const updatedAccident = await AccidentModel.find({
        _id: req.params.accidentId,
      });

      return res.json(updatedAccident);
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
//   transfer: async (req, res) => {
//     const accidentId = req.params.accidentId;
//     const newOfficer = req.body.newOfficer;
//     const createdBy = req.body.createdBy;
//     const update = { ...req.body };
//     console.log(update);
//     const formattedDate = moment().format("MMMM D, YYYY hh:mm A");

//     try {
//       await AccidentModel.updateOne(
//         { _id: req.params.accidentId },
//         { ...req.body, createdBy: newOfficer }
//       );

//       const updatedAccident = await AccidentModel.find({
//         _id: req.params.accidentId,
//       });

//       if (!updatedAccident) {
//         return res.status(404).send({ message: "Accident not found" });
//       }

//       if (newOfficer == createdBy) {
//         return;
//       } else {
//         const transferredAccident = new TransferedAccidentModel({
//           transferDate: formattedDate,
//           transferedFrom: createdBy,
//           transferedTo: newOfficer,
//           caseNumber: accidentId,
//           transferNotes: req.body.transferNotes,
//           status: "visible",
//         });
//         await transferredAccident.save();
//       }

//       res.send({ message: "Case transferred successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ message: "Internal server error" });
//     }
//   },
  delete: async (req, res) => {
    const accidentId = req.params.accidentId;
    const Status = "hidden";

    try {
      const updatedAccident = await AccidentModel.findByIdAndUpdate(
        accidentId,
        { Status },
        { new: true }
      );
      res.status(200).send(updatedAccident);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
    // const accidentId = req.params.accidentId;
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
    // "D:/Arlinda/Bro/UBT-CSE/Semestri5/Zhvillimi dhe Dizajnimi i Ueb/Vue-projekte/Projekt-clone/uploads/accidents/" + fileName;

    // try {
    //   await deleteFile(filePath);
    //   await AccidentModel.deleteOne({ _id: accidentId });
    //   res.json({ deleted: true });
    // } catch (err) {
    //   res
    //     .status(StatusCodes.NOT_FOUND)
    //     .json({ message: ReasonPhrases.NOT_FOUND });
    // }
  },
//   deleteTransfered: async (req, res) => {
//     const transferedaccidentId = req.params.transferedAccidentId;
//     const status = "hidden";
//     try {
//       const updatedtransferaccident =
//         await TransferedAccidentModel.findByIdAndUpdate(
//           transferedaccidentId,
//           { status },
//           { new: true }
//         );
//       res.status(200).send(updatedtransferaccident);
//     } catch (err) {
//       res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ message: ReasonPhrases.NOT_FOUND });
//     }
//   },
};

export default controller;
