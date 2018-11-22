'use strict'

/**
 * Valodator to create new User
 *
 * @class StoreUser
 */
class StoreUser {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return {
      email: 'normalize_email',
      isAdmin: 'boolean'
    }
  }

  get rules () {
    return {
      name: 'required|string',
      email: 'required|email|unique:users',
      password: 'required|string',
      isAdmin: 'boolean'
    }
  }

  /**
   *
   *
   * @readonly
   * @memberof StoreUser
   */
  get messages () {
    return {
      'email.required': 'É necessário informar o e-mail.',
      'email.email': 'O e-mail não é válido.',
      'email.unique': 'Este e-mail já está registrado.',
      'name.required': 'É necessário informar o nome.',
      'password.required': 'É necessário informar a senha.'
    }
  }
}

module.exports = StoreUser
