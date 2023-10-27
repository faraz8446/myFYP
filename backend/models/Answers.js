//const mongoose = require("mongoose");
import mongoose from "mongoose";
const answerSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
  },
  answer: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: Object,
});

const Answers = mongoose.model("Answers", answerSchema);
export default Answers;
