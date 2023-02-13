import express from "express";
import caseController from "../controllers/caseController";

const caseRouter = express.Router({ mergeParams: true });

caseRouter.get("/", caseController.list);
caseRouter.get("/:caseId", caseController.find);
caseRouter.post("/", caseController.create);
caseRouter.put("/:caseId", caseController.edit);
caseRouter.delete("/:caseId", caseController.delete);

export default caseRouter;
