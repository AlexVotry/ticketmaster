import request from 'supertest';
import app from '../../app';
import signup from '../../test/authHelper';

describe('current-user test', () => {
  
  test('responds with details about current user', async () => {
    const cookie = await signup();

    const response = await request(app)
      .get('/api/users/currentuser')
      .set('Cookie', cookie)
      .send()
      .expect(200);

      expect(response.body.currentUser.email).toBe('test@test.com');
  });

  test('responds with null if not authenticated', async () => {
    const response = await request(app)
      .get('/api/users/currentuser')
      .send({})
      .expect(200);

    expect(response.body.currentUser).toBeNull();
  });

});