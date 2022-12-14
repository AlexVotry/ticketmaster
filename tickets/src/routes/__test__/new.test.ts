import request from 'supertest';
import app from '../../app';
import { Ticket } from '../../models/ticket';

describe('new tests', () => {
  it('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app)
    .post('/api/tickets')
    .send({});
    
    expect(response.status).not.toBe(404);
  });
  
  it('can only be accessed if the user is signed in', async () => {
    await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401);
  });
  
  it('returns a status other than 401', async () => {
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({});
    
    expect(response.status).not.toBe(401);
  });
  
  it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 10
    })
    .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
  await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title: 'fake title',
    price: -10
  })
  .expect(400); 
  
  await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title: 'fake title',
  })
  .expect(400)
});

it('creates a ticket with valid inputs', async () => {
  let tickets = await Ticket.find({}); 
  
  expect(tickets.length).toBe(0);
  
  await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
    .send({
      title: 'fake title',
      price: 20
    })
    .expect(201);
    
    tickets = await Ticket.find({});
    
    expect(tickets.length).toBe(1);
    expect(tickets[0].price).toBe(20);
  });
  
});