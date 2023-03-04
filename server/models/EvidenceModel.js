import mongoose from "mongoose";

const schema = mongoose.Schema({
  identifier: String,
  description: String,
  caseNumber: String,
  notes: String,
  storageLocation: String,
  handlingInstructions: String,
  photo: {
    contentType: String,
    data: Buffer,
  },
  photoName: String,
  createdBy: String,
  createdAt: String,
  status: String,
});

const model = mongoose.model("evidences", schema);

export default model;
