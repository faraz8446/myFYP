import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  id: String,
  title: String,
  body: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: Object,
});

const Questions = mongoose.model("Questions", questionSchema);
export default Questions;
