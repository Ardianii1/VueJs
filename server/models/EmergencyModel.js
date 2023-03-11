import mongoose from "mongoose";

const schema = mongoose.Schema({
  Type: String,
  Dateof: String,
  Locationn: String,
  Description: String,
  Injuries: String,
  ContactOfperson: String,
  contentType: String,
  photoName: String,
  CreatedAt: String,
  Status: String,
});

const model = mongoose.model("emergencies", schema);

export default model;
