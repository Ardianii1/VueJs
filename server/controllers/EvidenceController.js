import { ReasonPhrases, StatusCodes } from "http-status-codes";
import EvidenceModel from "../models/EvidenceModel";
import createEvidenceSchema from "../validators/evidence/create";
import updateEvidenceSchema from "../validators/evidence/update";
import TransferedEvidenceModel from "../models/TransferedEvidenceModel";

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
  create: async (req, res) => {
    console.log(req.body);
    const newEvidence = new EvidenceModel(req.body);
    try {
      await newEvidence.save();
      return res.json(newEvidence);
    } catch (err) {
      return res.json(StatusCodes.UNAUTHORIZED).json({
        message: ReasonPhrases.UNAUTHORIZED,
        error: err.message,
      });
    }
    res
      .status(200)
      .json({ message: "File uploaded successfully.", evidence: evidence });
  },

  edit: async (req, res) => {
    const validationResult = updateEvidenceSchema.validate(req.body);
    console.log(req.body);

    // if (validationResult.error) {
    //   return res.status(StatusCodes.UNAUTHORIZED).json({
    //     message: ReasonPhrases.UNAUTHORIZED,
    //     error: validationResult.error.message,
    //   });
    // }

    try {
      await EvidenceModel.updateOne({ _id: req.params.evidenceId }, req.body);

      const updatedEvidence = await EvidenceModel.find({
        _id: req.params.evidenceId,
      });

      return res.json(updatedEvidence);
    } catch (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: ReasonPhrases.UNAUTHORIZED,
        error: validationResult.error.message,
      });
    }
  },
  transfer: async (req, res) => {
    const evidenceId = req.params.evidenceId;
    const newOfficer = req.body.newOfficer;
    const createdBy = req.body.createdBy;
    const update = { ...req.body, createdBy: newOfficer };
    try {
      const updatedEvidence = await EvidenceModel.findByIdAndUpdate(
        evidenceId,
        update,
        { new: true }
      );
      if (!updatedEvidence) {
        return res.status(404).send({ message: "Evidence not found" });
      }
      const transferredEvidence = new TransferedEvidenceModel({
        transferDate: Date.now(),
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
  },
};

export default controller;
