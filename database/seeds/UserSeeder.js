'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run () {
    const user = await Factory.model('App/Models/User')
      .create({
        name: 'Admin',
        email: 'admin@test.com',
        password: 'admin'
      });
    console.log(user);
  }
}

module.exports = UserSeeder
