const request = require('supertest');
const app = require('../app');

let id;
let token;

test('POST /users', async () => { 
    const user = {
        firstName: 'Lelio',
        lastName: 'Gracia',
        email: 'lelio@gmail.com',
        password: 'lelio1234',
        phone: '123456789'
    }
    const res = await request(app).post('/users').send(user);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(user.firstName);
 });

test('POST /users/login', async () => {
    const user = {
        email: 'lelio@gmail.com',
        password: 'lelio1234'
    }
    const res = await request(app).post('/users/login').send(user);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

test('POST /users/login debe retornar credenciales incorrectas', async () => {
    const user = {
        email: 'incorecto@gmail.com',
        password: 'incorrecto1234'
    }
    const res = await request(app).post('/users/login').send(user);
    expect(res.status).toBe(401);
});

test('GET /users', async () => { 
    const res = await request(app)
    .get('/users')
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

 test('PUT /users/:id', async () => {
    const user = {
        firstName: 'Kevin'
    }
    const res = await request(app).put(`/users/${id}`)
    .send(user)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(user.firstName);
});

test('DELETE /users/:id', async () => {
    const res = await request(app)
    .delete(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});