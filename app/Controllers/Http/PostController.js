"use strict";

class PostController {
  async getPosts({ auth, request }) {
    const data = request.all();

    return {
      success: true,
      ...jwt,
      message: "Logged in successfully",
    };
  }
  async getPost({ auth, request }) {
    const data = request.all();
    let user = await auth.validate(email, password, true);

    return {
      success: true,

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
