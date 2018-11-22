'use strict'

const Product = use('App/Models/Product');
const Controller = require('./Controller');


class ProductController extends Controller {

  get model() {
    return Product;
  }

  /**
   *
   *
   * @param {*} { request }
   * @memberof ProductController
   */
  async store({ request }) {
    const data = request.only(['name', 'price', 'description'])
    return this.model.create(data);
  }


}

module.exports = ProductController
