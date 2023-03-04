import Joi from "joi";

const createEvidenceSchema = Joi.object({
  identifier: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(10).max(100).required(),
  caseNumber: Joi.string().min(3).max(30).required(),
  notes: Joi.string().max(100),
  storageLocation: Joi.string().max(100),
  handlingInstructions: Joi.string().max(100),
  photo: Joi.any().required(),
  photoName: Joi.string()
    .regex(/^(\d{2})\/(\d{2})\/(\d{4}):(\d{2})\/(\d{2})$/)
    .required(),
  createdBy: Joi.string().max(100),
  createdAt: Joi.any(),
  status: Joi.string().max(30),
});

export default createEvidenceSchema;
