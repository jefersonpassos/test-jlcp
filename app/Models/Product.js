'use strict'

const Model = use('Model')

/**
 * @class Product
 * @extends Model
 * @property {string} name
 * @property {number} price
 * @property {string} description
 */
class Product extends Model {

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
        'price',
        'description'
      ],
      unique: []
    }
  }
}

module.exports = Product
