import mongoose from "mongoose";

const schema = mongoose.Schema({
  casenumber: String,
  dateof: String,
  location: String,
  description: String,
  parties: String,
  status: String,
  notes: String,
  photo: {
    contentType: String,
    data: Buffer,
  },
  photoName: String,
  createdBy: String,
  createdAt: String,
  deleted: String,
});

const model = mongoose.model("cases", schema);

export default model;
