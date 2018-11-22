'use strict'

class StoreProduct {

  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|string',
      price: 'required|number',
      description: 'required|string'
    }
  }

  get messages () {
    return {
      'name.required': 'É necessário informar o nome do produto',
      'price.required': 'É necessário informar o preço do produto',
      'description.required': 'É necessário informar a descrição do produto'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = StoreProduct
