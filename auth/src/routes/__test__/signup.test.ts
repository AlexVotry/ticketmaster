import request from 'supertest';
import app from '../../app';


describe('signup route tests', () => {
  test('returns 201 on successful signup', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);
  });

  test('should return 400 with invalid email', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test.com',
        password: 'password'
      })
      .expect(400);
  });

  test('should return 400 with invalid password', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'pd'
      })
      .expect(400);
  });

  test('should return 400 with missing email and pw', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({})
      .expect(400);
  });

  test('should return 400 if signup with duplicate email',async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);

    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(400);
  });

  test('should set a cookie after successful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
  });

});