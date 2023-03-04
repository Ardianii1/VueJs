import Joi from "joi";

const updateEvidenceSchema = Joi.object({
  identifier: Joi.string().min(3).max(30).trim().required(),
  description: Joi.string().min(10).max(100).trim().required(),
  caseNumber: Joi.string().min(3).max(30).trim().required(),
  notes: Joi.string().max(100).trim(),
  storageLocation: Joi.string().max(100).trim(),
  handlingInstructions: Joi.string().max(100).trim(),
  photo: Joi.any().required(),
  photoName: Joi.string()
    .regex(/^(\d{2})\/(\d{2})\/(\d{4}):(\d{2})\/(\d{2})$/),
  createdBy: Joi.string().max(100),
  createdAt: Joi.any(),
  status: Joi.string().max(30),
});

export default updateEvidenceSchema;
