import mongoose from "mongoose";

const schema = mongoose.Schema({
  transferDate: Date,
  transferedFrom: String,
  transferedTo: String,
  caseNumber: String,
  transferNotes: String,
});

const model = mongoose.model("transferedEvidences", schema);

export default model;
