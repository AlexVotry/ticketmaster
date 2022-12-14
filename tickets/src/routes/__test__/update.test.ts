import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../app';

describe('update tests', () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const ticket = {
    title: 'fake ticket',
    price: 20
  };
  
  it('returns a 404 if id does not exist', async () => {
    await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send(ticket)
    .expect(404);
  });
  
  it('returns 401 if the user is not authenticated', async () => {
    await request(app)
    .put(`/api/tickets/${id}`)
    .send(ticket)
    .expect(401);
  });
  
  it('returns 401 if the user does not own the ticket', async () => {
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send(ticket);
    
    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send(ticket)
    .expect(401);
  });
  
  it('returns a 400 if the user provides an invalid title or price', async () => {
    const cookie = global.signin();

    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send(ticket)
    .expect(201)
    
    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({title: '', price: 20 })
    .expect(400);

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({title: 'fake ticket', price: -20 })
    .expect(400);
  });
  
  it('updates the ticket provided valid inputs', async () => {
    const cookie = global.signin();

    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send(ticket)
    .expect(201)
    
    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({title: 'new ticket', price: 120 })
    .expect(200);

    const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send();

    expect(ticketResponse.body.title).toBe('new ticket');
    expect(ticketResponse.body.price).toBe(120);
  });
});


