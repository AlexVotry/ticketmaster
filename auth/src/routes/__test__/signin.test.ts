import request from 'supertest';
import app from '../../app';
import signup from '../../test/authHelper';

describe('signin route tests', () => {
  test('should return 400 when email does not exist', async () => {
    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(400)
  });

  test('should fail when an incorrect password is supplied', async () => {
    await signup();

    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'psod'
      })
      .expect(400);
  })

  test('should provide a cookie with correct credentials', async () => {
    await signup();

    const response = await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
  })
});