'use strict'

/**
 *
 *
 * @class AuthController
 */
class AuthController {

  /**
   *
   *
   * @param {*} { request, auth }
   * @returns
   * @memberof AuthController
   */
  async getToken({ request, auth }) {
    const { email, password } = await request.only(['email', 'password']);

    return await auth
      .withRefreshToken()
      .attempt(email, password);
  }

  /**
   *
   *
   * @param {*} { request, auth }
   * @returns
   * @memberof AuthController
   */
  async refreshToken({ request, auth }) {
    const { refreshToken } = await request.only(['refreshToken']);

    return await auth
      .newRefreshToken()
      .generateForRefreshToken(refreshToken)
  }
}

module.exports = AuthController
