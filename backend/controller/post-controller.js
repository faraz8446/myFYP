import Post from "../models/post.js";

export const createBlog = async (request, response) => {
  try {
    const post = await new Post(request.body);
    post.save();

    response.status(200).json("Post saved successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};

export const updateBlog = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    await Post.findByIdAndUpdate(request.params.id, { $set: request.body });

    response.status(200).json("post updated successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};

export const deleteBlog = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    await post.delete();

    response.status(200).json("post deleted successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getBlog = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    response.status(200).json(post);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getAllBlogs = async (request, response) => {
  let username = request.query.username;
  let category = request.query.category;
  let posts;
  try {
    if (username) posts = await Post.find({ username: username });
    else if (category) posts = await Post.find({ categories: category });
    else posts = await Post.find({});

    response.status(200).json(posts);
  } catch (error) {
    response.status(500).json(error);
  }
};
