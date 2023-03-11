import Joi from "joi";

const createCrimeSchema = Joi.object({
  Type: Joi.string().required(),
  dateof: Joi.string().required(),
  Locationn: Joi.string().required().min(4).max(250),
  Description: Joi.string().required().min(4).max(250),
  Suspects: Joi.string().required().min(4).max(250),
  ContactOfperson: Joi.string().min(4).max(250),
  photo: Joi.any().required(),
  photoName: Joi.any(),
  CreatedAt:Joi.string().max(30),
  Status:Joi.string().max(30),
});

export default createCrimeSchema;
