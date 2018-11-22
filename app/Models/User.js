'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/**
 * @class
 * @extends Model
 *
 * @property {string} name
 * @property {email} email
 * @property {password} password
 * @property {boolean} isAdmin
 */

class User extends Model {

  /**
   * Model schema
   * Declare attributes, unique attribures and relationships
   * This informations is used by generic controller
   *
   * @readonly
   * @static
   * @memberof Product
   */
  static get schema() {
    return {
      attributes: [
        'name',
        'email',
        'password',
        'isAdmin'
      ],
      unique: [],
      relationships: []
    }
  }

  static get hidden () {
    return ['password']
  }

  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
