import Joi from "joi";

const updateCaseSchema = Joi.object({
  _id: Joi.any(),
  casenumber: Joi.string().required(),
  dateof: Joi.date().required(),
  location: Joi.string().required(),
  description: Joi.string().min(4).max(250).required(),
  parties: Joi.string().required().min(4).max(250),
  status: Joi.string().required().min(4).max(250),
  notes: Joi.string().required().min(4).max(250).allow(null),
  photo: Joi.any().required(),
  photoName: Joi.string().required(),
  createdBy: String,
  createdAt: String,
  deleted: String,
  __v: Joi.any()
});

export default updateCaseSchema;
