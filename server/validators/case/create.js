import Joi from "joi";

const createCaseSchema = Joi.object({
  casenumber: Joi.number().required(),
  date: Joi.date().required(),
  location: Joi.string().required().min(4).max(250),
  description: Joi.string().required().min(4).max(250),
  parties: Joi.string().required().min(4).max(250),
  status: Joi.string().required().min(4).max(250),
  notes: Joi.string().required().min(4).max(250).allow(null),
});

export default createCaseSchema;
