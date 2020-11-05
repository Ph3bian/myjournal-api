"use strict";
const User = use("App/Models/User");
const Logger = use("Logger");
class UserController {
  async login({ auth, request, response }) {
    try {
      const { email, password } = request.all();
      const userData = await User.findBy("email", email);
      if (!userData) throw new Error("Invalid Credentials");
      let user = await auth.attempt(email, password);

      return response.send({
        success: true,
        token: user.token,
        user: userData,
        message: "Logged in successfully",
      });
    } catch (error) {
      return response.badRequest({
        success: false,
        error,
      });
    }
  }
  async register({ auth, request, response }) {
    const userData = request.all();
    if (!userData) {
      return response.badRequest({
        success: false,
        message: "Invalid credentials",
      });
    }
    try {
      const user = await User.findOrCreate(userData);

      const jwt = await auth.generate(user);

      return response.send({
        success: true,
        ...jwt,
        user,
        message: "Account Created",
      });
    } catch (error) {
      return response.badRequest({
        success: false,
        message: `Error creating user account`,
        error,
      });
    }
  }
}

module.exports = UserController;
