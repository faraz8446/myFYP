import express, { Router } from "express";

import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  getAllBlogs,
} from "../controller/post-controller.js";
import { newComment, getComments } from "../controller/comment-controller.js";

const router = express.Router();

router.post("/create", createBlog);
router.put("/update/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);

router.get("/post/:id", getBlog);
router.get("/posts", getAllBlogs);

router.post("/comment/new", newComment);
router.get("/comments/:id", getComments);

export default router;
