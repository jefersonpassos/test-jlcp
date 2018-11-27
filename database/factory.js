'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, i, data) => {
  return {
    name: data.name ? data.name : faker.name(),
    email: data.email? data.email : faker.email() ,
    password: data.password ? data.password : faker.password(),
    isAdmin: data.isAdmin ? data.isAdmin : false
  }
})
