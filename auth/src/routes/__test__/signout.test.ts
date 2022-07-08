import request from 'supertest';
import app from '../../app';
import signup from '../../test/authHelper';

describe('signout test', () => {
  
  test('', async() => {
    await signup();
    
    const response = await request(app)
      .post('/api/users/signout')
      .send({})
      .expect(200);

    const sess = response.get('Set-Cookie')[0].split(';')[0];
    
    expect(sess).toBe('session=');
  });
});