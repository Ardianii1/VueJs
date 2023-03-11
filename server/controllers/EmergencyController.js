import { ReasonPhrases, StatusCodes } from "http-status-codes";
import EmergencyModel from "../models/EmergencyModel";
import createEmergencySchema from "../validators/emergency/create";
import updateEmergencySchema from "../validators/emergency/update";
const moment = require("moment");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "../uploads/reports/emergencys");
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
      const list = await EmergencyModel.find({ Status: "visible" });
      return res.json(list);
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
    }
  },
//   transfered: async (req, res) => {
//     try {
//       const list = await TransferedEmergencyModel.find({ status: "visible" });
//       return res.json(list);
//     } catch (err) {
//       res
//         .status(StatusCodes.INTERNAL_SERVER_ERROR)
//         .json({ error: err.message });
//     }
//   },
  find: async (req, res) => {
    try {
      const emergency = await EmergencyModel.findOne({
        _id: req.params.emergencyId,
      });

      if (!emergency) throw Error("Emergency not found");
      return res.json(emergency);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  edit: async (req, res) => {
    const validationResult = updateEmergencySchema.validate(req.body);
    if (validationResult.error) {
      if (!res.headersSent) {
        res.setHeader("Content-Type", "application/json");
      }
    }
    try {
      console.log(req.body);

      await EmergencyModel.updateOne({ _id: req.params.emergencyId }, req.body);

      const updatedEmergency = await EmergencyModel.find({
        _id: req.params.emergencyId,
      });

      return res.json(updatedEmergency);
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
//     const emergencyId = req.params.emergencyId;
//     const newOfficer = req.body.newOfficer;
//     const createdBy = req.body.createdBy;
//     const update = { ...req.body };
//     console.log(update);
//     const formattedDate = moment().format("MMMM D, YYYY hh:mm A");

//     try {
//       await EmergencyModel.updateOne(
//         { _id: req.params.emergencyId },
//         { ...req.body, createdBy: newOfficer }
//       );

//       const updatedEmergency = await EmergencyModel.find({
//         _id: req.params.emergencyId,
//       });

//       if (!updatedEmergency) {
//         return res.status(404).send({ message: "Emergency not found" });
//       }

//       if (newOfficer == createdBy) {
//         return;
//       } else {
//         const transferredEmergency = new TransferedEmergencyModel({
//           transferDate: formattedDate,
//           transferedFrom: createdBy,
//           transferedTo: newOfficer,
//           caseNumber: emergencyId,
//           transferNotes: req.body.transferNotes,
//           status: "visible",
//         });
//         await transferredEmergency.save();
//       }

//       res.send({ message: "Case transferred successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ message: "Internal server error" });
//     }
//   },
  delete: async (req, res) => {
    const emergencyId = req.params.emergencyId;
    const Status = "hidden";

    try {
      const updatedEmergency = await EmergencyModel.findByIdAndUpdate(
        emergencyId,
        { Status },
        { new: true }
      );
      res.status(200).send(updatedEmergency);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
    // const emergencyId = req.params.emergencyId;
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
    // "D:/Arlinda/Bro/UBT-CSE/Semestri5/Zhvillimi dhe Dizajnimi i Ueb/Vue-projekte/Projekt-clone/uploads/emergencys/" + fileName;

    // try {
    //   await deleteFile(filePath);
    //   await EmergencyModel.deleteOne({ _id: emergencyId });
    //   res.json({ deleted: true });
    // } catch (err) {
    //   res
    //     .status(StatusCodes.NOT_FOUND)
    //     .json({ message: ReasonPhrases.NOT_FOUND });
    // }
  },
//   deleteTransfered: async (req, res) => {
//     const transferedemergencyId = req.params.transferedEmergencyId;
//     const status = "hidden";
//     try {
//       const updatedtransferemergency =
//         await TransferedEmergencyModel.findByIdAndUpdate(
//           transferedemergencyId,
//           { status },
//           { new: true }
//         );
//       res.status(200).send(updatedtransferemergency);
//     } catch (err) {
//       res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ message: ReasonPhrases.NOT_FOUND });
//     }
//   },
};

export default controller;
