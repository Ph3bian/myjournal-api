"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AuthValidator {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */

  async handle({ request, response }, next) {
    const token = request.headers().authorization.split(" ")[1];

    if (!token) {
      response.unauthorized({
        success: false,
        message: `Invalid token`,
      });
      return;
    }

    // call next to advance the request
    await next();
  }
}

module.exports = AuthValidator;
