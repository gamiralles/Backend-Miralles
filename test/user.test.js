import request from 'supertest';
import { strict as assert } from "assert";
import app from '../src/server.js';

describe('User API', function() {
  this.timeout(5000);

  let userId;

  it(`Deberia crear un nuevo usuario`, async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Test',
        lastName: 'API',
        email: 'test.api@example.com',
        age: 30,
        password: 'password123',
        role: 'user'
      });
      userId = res.body.user._id;
      assert.strictEqual(res.status, 201);
  });

  it('Deberia devolver todos los usuarios', async () => {
    const res = await request(app)
      .get('/api/users');
    assert.strictEqual(res.status, 200);
    // assert.ok(res.body.length > 0);
  });

  it(`Deberia devolver el usuario creado`, async () => {
    const res = await request(app)
    .get(`/api/users/${userId}`);
    assert.strictEqual(res.status, 200);
  })

  it(`Deberia iniciar sesion con el usaurio creado en el test anterior`, async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test.api@example.com',
        password: 'password123'
      });
    assert.strictEqual(res.status, 200);
  });

  it(`Deberia eliminar el usuario creado en el test anterior`, async () => {
    const res = await request(app)
    .delete(`/api/users/${userId}`);
    assert.strictEqual(res.status, 200);
  })
});
