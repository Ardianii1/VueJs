import Joi from "joi";

const updateCaseSchema = Joi.object({
  casenumber: Joi.number().required(),
  date: Joi.date().required(),
  location: Joi.string().required(),
  description: Joi.string().required().min(4).max(250),
  parties: Joi.string().required().min(4).max(250),
  status: Joi.string().required().min(4).max(250),
  notes: Joi.string().required().min(4).max(250).allow(null),
  photo: Joi.any().required(),
  photoName: Joi.string()
    .regex(/^(\d{2})\/(\d{2})\/(\d{4}):(\d{2})\/(\d{2})$/)
    .required(),
});

export default updateCaseSchema;
