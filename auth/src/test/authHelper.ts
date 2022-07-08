import request from 'supertest';
import app from '../app';


// supertest doesn't handle cookies properly so we created a signup helper.
const signup = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password
    })
    expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};

export default signup;