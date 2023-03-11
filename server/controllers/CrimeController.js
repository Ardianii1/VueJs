import { ReasonPhrases, StatusCodes } from "http-status-codes";
import CrimeModel from "../models/CrimeModel";
import createCrimeSchema from "../validators/crime/create";
import updateCrimeSchema from "../validators/crime/update";
const moment = require("moment");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "../uploads/reports/crimes");
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
      const list = await CrimeModel.find({ Status: "visible" });
      return res.json(list);
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
    }
  },
//   transfered: async (req, res) => {
//     try {
//       const list = await TransferedCrimeModel.find({ status: "visible" });
//       return res.json(list);
//     } catch (err) {
//       res
//         .status(StatusCodes.INTERNAL_SERVER_ERROR)
//         .json({ error: err.message });
//     }
//   },
  find: async (req, res) => {
    try {
      const crime = await CrimeModel.findOne({
        _id: req.params.crimeId,
      });

      if (!crime) throw Error("Crime not found");
      return res.json(crime);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  edit: async (req, res) => {
    const validationResult = updateCrimeSchema.validate(req.body);
    if (validationResult.error) {
      if (!res.headersSent) {
        res.setHeader("Content-Type", "application/json");
      }
    }
    try {
      console.log(req.body);

      await CrimeModel.updateOne({ _id: req.params.crimeId }, req.body);

      const updatedCrime = await CrimeModel.find({
        _id: req.params.crimeId,
      });

      return res.json(updatedCrime);
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
//     const crimeId = req.params.crimeId;
//     const newOfficer = req.body.newOfficer;
//     const createdBy = req.body.createdBy;
//     const update = { ...req.body };
//     console.log(update);
//     const formattedDate = moment().format("MMMM D, YYYY hh:mm A");

//     try {
//       await CrimeModel.updateOne(
//         { _id: req.params.crimeId },
//         { ...req.body, createdBy: newOfficer }
//       );

//       const updatedCrime = await CrimeModel.find({
//         _id: req.params.crimeId,
//       });

//       if (!updatedCrime) {
//         return res.status(404).send({ message: "Crime not found" });
//       }

//       if (newOfficer == createdBy) {
//         return;
//       } else {
//         const transferredCrime = new TransferedCrimeModel({
//           transferDate: formattedDate,
//           transferedFrom: createdBy,
//           transferedTo: newOfficer,
//           caseNumber: crimeId,
//           transferNotes: req.body.transferNotes,
//           status: "visible",
//         });
//         await transferredCrime.save();
//       }

//       res.send({ message: "Case transferred successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ message: "Internal server error" });
//     }
//   },
  delete: async (req, res) => {
    const crimeId = req.params.crimeId;
    const Status = "hidden";

    try {
      const updatedCrime = await CrimeModel.findByIdAndUpdate(
        crimeId,
        { Status },
        { new: true }
      );
      res.status(200).send(updatedCrime);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
    // const crimeId = req.params.crimeId;
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
    // "D:/Arlinda/Bro/UBT-CSE/Semestri5/Zhvillimi dhe Dizajnimi i Ueb/Vue-projekte/Projekt-clone/uploads/crimes/" + fileName;

    // try {
    //   await deleteFile(filePath);
    //   await CrimeModel.deleteOne({ _id: crimeId });
    //   res.json({ deleted: true });
    // } catch (err) {
    //   res
    //     .status(StatusCodes.NOT_FOUND)
    //     .json({ message: ReasonPhrases.NOT_FOUND });
    // }
  },
//   deleteTransfered: async (req, res) => {
//     const transferedcrimeId = req.params.transferedCrimeId;
//     const status = "hidden";
//     try {
//       const updatedtransfercrime =
//         await TransferedCrimeModel.findByIdAndUpdate(
//           transferedcrimeId,
//           { status },
//           { new: true }
//         );
//       res.status(200).send(updatedtransfercrime);
//     } catch (err) {
//       res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ message: ReasonPhrases.NOT_FOUND });
//     }
//   },
};

export default controller;
