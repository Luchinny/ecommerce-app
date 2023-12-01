const request = require('supertest');
const app = require('../app');
require ('../models')

let id;
let token;

beforeAll(async() => {
    const user = {
        email: 'test@gmail.com',
        password: 'test1234',
    }
    const res = await request(app).post('/users/login').send(user);
    token = res.body.token;
    console.log(res.body);
});


test('GET /products', async () => {
    const res = await request(app).get('/products')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /products', async () => { 
    const product = {
    title: "Celular Smartphone",
    description: "Glaxy S21 128gb",
    brand: "Samsung",
    price:  250 
    }
    const res = await request(app).post('/products').send(product)
    .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe(product.title);
 });

 test('DELETE', async () => {
    const res = await request(app)
    .delete(`/products/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  })