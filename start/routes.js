'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('login', 'AuthController.getToken')
Route.post('token/refresh', 'AuthController.refreshToken')

Route
  .resource('users', 'UserController')
  .middleware(new Map([
    [['users.update', 'users.delete'], ['auth']]
  ]))
  .validator(new Map([
      [['users.store'], ['StoreUser']]
    ]
  ));

Route
  .resource('products', 'ProductController')
  .middleware(['auth'])
  .validator(new Map([
      [['products.store'], ['StoreProduct']]
    ]
  ));

