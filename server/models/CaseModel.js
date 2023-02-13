import mongoose from "mongoose";

const schema = mongoose.Schema({
  casenumber: Number,
  date: Date,
  location: String,
  description: String,
  parties: String,
  includedparites: String,
  status: String,
  notes: String,
});

const model = mongoose.model("cases", schema);

export default model;
