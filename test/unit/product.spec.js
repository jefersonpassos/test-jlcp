const { test, trait, before, after } = use('Test/Suite')('Product')

const User = use('App/Models/User')
const Product = use('App/Models/Product')

let product = new Product();
product.name = 'Product Test';
product.price = 10.10;
product.description = 'Description test';

let user;

trait('Test/ApiClient')
trait('Auth/Client')

before(async () => {
  user = await User.create({
    'email': 'userTest@test.com',
    'name': 'user test',
    'password': 'test'
  });
});

test('create product', async ({ client, assert }) => {
  const response = await client
    .post('products')
    .send({
      name: product.name,
      price: product.price,
      description: product.description
    })
    .loginVia(user, 'jwt')
    .accept('json')
    .end();

  const { body } = response;

  response.assertStatus(200);
  response.assertHeader('content-type', 'application/json; charset=utf-8')
  assert.equal(product.name, body.name);
  assert.equal(product.price, body.price);
  assert.equal(product.description, body.description);

  product = response.body;
});


test('find one product by id', async ({ client, assert }) => {

  const response = await client
    .get(`products/${product._id}`)
    .loginVia(user, 'jwt')
    .accept('json')
    .end();

  const { body } = response;

  response.assertStatus(200);
  response.assertHeader('content-type', 'application/json; charset=utf-8')
  assert.equal(product.name, body.name);
  assert.equal(product.price, body.price);
  assert.equal(product.description, body.description);
})


test('get list of products', async ({ client }) => {
  const response = await client
    .get('products')
    .loginVia(user, 'jwt')
    .accept('json')
    .end()

  response.assertStatus(200);
  response.assertHeader('content-type', 'application/json; charset=utf-8')
});

after(async () => {
  const _product = await Product.find(product._id);
  if(_product)
    await _product.delete();

  await user.delete();
})
