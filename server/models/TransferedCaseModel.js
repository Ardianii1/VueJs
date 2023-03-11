import mongoose from "mongoose";

const schema = mongoose.Schema({
  transferDate: String,
  transferedFrom: String,
  transferedTo: String,
  caseNumber: String,
  transferNotes: String,
  status: String,
});

const model = mongoose.model("transferedCases", schema);

export default model;
