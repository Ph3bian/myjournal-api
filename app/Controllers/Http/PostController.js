"use strict";
const Post = use("App/Models/Post");

class PostController {
  async getPosts({ auth, request }) {
    const post = await Post.all();

    return {
      success: true,
      post,
      message: "Logged in successfully",
    };
  }
  async getPost({ auth, request }) {
    const { id } = request.all();
    const post = await Post.findBy("id", id);

    return {
      success: true,
      post,
      message: "Logged in successfully",
    };
  }
  async editPost({ auth, request }) {
    const data = request.all();

    return {
      success: true,
      data,
      message: "Edit successful",
    };
  }
  async deletePost({ auth, request }) {
    const { email, password } = request.all();

    const data = request.all();

    return {
      success: true,
      data,
      message: "Edit successful",
    };
  }
}

module.exports = PostController;
