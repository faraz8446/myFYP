import express from "express";
const router = express.Router();
import Answers from "../models/Answers.js";

router.post("/", async (req, res) => {
  const answerData = new Answers({
    question_id: req.body.question_id,
    answer: req.body.answer,
    user: req.body.user,
  });

  await answerData
    .save()
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "Answer not added successfully",
      });
    });
});

export default router;
