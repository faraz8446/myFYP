import express, { Router } from "express";
import questionRouter from "./Question.js";
import answerRouter from "./Asnwer.js";

const router = express.Router();

router.use("/question", questionRouter);
router.use("/answer", answerRouter);

export default router;
