"use strict";
const Post = use("App/Models/Post");
const Handler = use('App/Exceptions/Handler')
var Logger = use("Logger");
class PostController extends Handler {
  async getPosts({ auth, response }) {
    try {
      const validUser = await auth.getUser();
      Logger.info("helllooo tello");
      Logger.info(JSON.stringify(validUser));
      const post = await Post.all();

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
     const isValid= await auth.check()
      const validUser = await auth.getUser();
      Logger.info(isValid);
      if (!isValid) {
       response.unauthorized({
          message: "Missing or invalid jwt token",
          success: false,
        });
        return
      }
      const data = request.all();
      data.user_id = validUser.id;

      await Post.create(data);
      return response.send({
        success: true,
        message: "Posts created successfully",
      });
    } catch (error) {
      response.badRequest({
        message: "Error creating post",
        success: false,
      });
    }
  }
  async getPost({ request, response }) {
    try {
      const { id } = request.all();
      const post = await Post.findBy("id", id);
      return response.send({
        success: true,
        post,
        message: "Post retrieved successfully",
      });
    } catch (error) {
      return response.badRequest({
        success: false,
        message: "Post not found",
      });
    }
  }
  async editPost({ auth, request, response }) {
    try {
      const { id, title, description } = request.all();
      const post = await Post.find(id);
      if (title) {
        post.title = title;
      }
      if (description) {
        post.description = description;
      }
      await post.save();
      return response.send({
        success: true,
        message: "Edit Post successful",
      });
    } catch (error) {
      return response.badRequest({
        success: false,
        message: "Edit Post failed",
      });
    }
  }
  async deletePost({ auth, response, request }) {
    try {
      const { id } = request.all();
      const post = await Post.find(id);
      await post.delete();
      return response.status(204).send({
        success: true,
      });
    } catch (error) {
      return response.badRequest({
        success: false,
        message: "Delete failed",
      });
    }
  }
}

module.exports = PostController;
