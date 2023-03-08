import { ReasonPhrases, StatusCodes } from "http-status-codes";
import CaseModel from "../models/CaseModel";
import createCaseSchema from "../validators/case/create";
import updateCaseSchema from "../validators/case/update";
import TransferedCaseModel from "../models/TransferedCaseModel";

const controller = {
  list: async (req, res) => {
    const list = await CaseModel.find({ deleted: "visible" });
    return res.json(list);
  },
  find: async (req, res) => {
    try {
      const casee = await CaseModel.findOne({
        _id: req.params.caseId,
      });

      if (!casee) throw Error("Case not found");
      return res.json(casee);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  create: async (req, res) => {
    console.log("req.body - ", req.body);
    const validationResult = createCaseSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: ReasonPhrases.UNAUTHORIZED,
        error: validationResult.error.message,
      });
    }
    const newCase = new CaseModel(req.body);

    try {
      await newCase.save();

      return res.json(newCase);
    } catch (err) {
      return res.json(StatusCodes.UNAUTHORIZED).json({
        message: ReasonPhrases.UNAUTHORIZED,
        error: err.message,
      });
    }
  },
  edit: async (req, res) => {
    const validationResult = updateCaseSchema.validate(req.body);
    console.log(req.body);

    // if (validationResult.error) {
    //   return res.status(StatusCodes.UNAUTHORIZED).json({
    //     message: ReasonPhrases.UNAUTHORIZED,
    //     error: validationResult.error.message,
    //   });
    // }

    try {
      await CaseModel.updateOne({ _id: req.params.caseId }, req.body);

      const updatedCase = await CaseModel.find({
        _id: req.params.caseId,
      });

      return res.json(updatedCase);
    } catch (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: ReasonPhrases.UNAUTHORIZED,
        error: validationResult.error.message,
      });
    }
  },
  transfer: async (req, res) => {
    const caseId = req.params.caseId;
    const newOfficer = req.body.newOfficer;
    const createdBy = req.body.createdBy;
    const update = { ...req.body };
    console.log(update);

    try {
      await CaseModel.updateOne(
        { _id: req.params.caseId },
        { ...req.body, createdBy: newOfficer }
      );

      const updatedCase = await CaseModel.find({
        _id: req.params.caseId,
      });

      if (!updatedCase) {
        return res.status(404).send({ message: "Case not found" });
      }

      const transferredCase = new TransferedCaseModel({
        transferDate: Date.now(),
        transferedFrom: createdBy,
        transferedTo: newOfficer,
        caseNumber: caseId,
        transferNotes: req.body.transferNotes,
      });

      await transferredCase.save();

      res.send({ message: "Case transferred successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error" });
    }
  },
  delete: async (req, res) => {
    const caseId = req.params.caseId;

    try {
      await CaseModel.deleteOne({ _id: caseId });
      res.json({ deleted: true });
    } catch (err) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: ReasonPhrases.NOT_FOUND });
    }
  },
};

export default controller;
