'use strict'

const User = use('App/Models/User')
const Controller = require('./Controller');

class UserController extends Controller {

    /**
     * User model
     *
     * @readonly
     * @memberof UserController
     * @returns {object} user model
     */
    get model () {
        return User;
    }

    /**
     * Create new User
     * @method store
     * @param {*} { request }
     * @memberof UserController
     * @returns {object} User
     */
    async store({ request }){
        const data = await request.only(this.model.schema.attributes);
        if(!data.isAdmin)
          data.isAdmin = false;

        return  this.model.create(data);
    }

    /**
     * Update user
     * If user is not Admin,
     * ignore user id and update authenticated user
     *
     * @param {*} { request, params, auth }
     * @returns
     * @memberof UserController
     */
    async update({ request, params, auth }){
      const user = await auth.getUser();
      const currentData = '';

      let data = await request.only(this.model.schema.attributes)
      if(user.isAdmin())
        currentData = await this.model.find(params.id);
      else
        currentData = user;

      await currentData.merge(data)
      await currentData.save();

      return currentData;
    }
}

module.exports = UserController
