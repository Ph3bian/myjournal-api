"use strict";
const Post = use("App/Models/Post");
const Logger = user("Logger");
class PostController {
  async getPosts({ auth, response }) {
    try {
      const validUser = await auth.check();
      const post = await Post.all();
      Logger.info("here oo", validUser);
      if (!validUser) {
        return response.unauthorized({
          message: "Missing or invalid jwt token",
          success: false,
        });
      }
      return {
        success: true,
        post,
        message: "Posts retrieved successfully",
      };
    } catch (error) {
      response.send({
        message: "Missing or invalid jwt token",
        success: false,
      });
    }
  }
  async createPost({ auth, request, response }) {
    try {
      const validUser = await auth.check();
      if (!validUser) {
        console.log("here oo");
        return response.badRequest({
          message: "Missing or invalid jwt token",
          success: false,
        });
      }
      const data = request.all();

      await Post.create(data);
      return response.send({
        success: true,
        message: "Posts retrieved successfully",
      });
    } catch (error) {
      response.badRequest({
        message: "Error creating post",
        success: false,
      });
    }
  }
  async getPost({ auth, request, response }) {
    const { id } = request.all();
    try {
      const post = await Post.findBy("id", id);

      return response.send({
        success: true,
        post,
        message: "Logged in successfully",
      });
    } catch (error) {
      return response.badRequest({
        success: false,
        error,
      });
    }
  }
  async editPost({ auth, request, response }) {
    const data = request.all();
    try {
      return response.send({
        success: true,
        data,
        message: "Edit Post successful",
      });
    } catch (error) {
      return response.badRequest({
        success: false,
        error,
      });
    }
  }
  async deletePost({ auth, request, response }) {
    const { email, password } = request.all();

    const data = request.all();

    return response.status(204).send({
      success: true,
    });
  }
}

module.exports = PostController;
