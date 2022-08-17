import nats from 'node-nats-streaming';
import TicketCreatedPublisher from './events/ticket-created-publisher';

console.clear();
// stan is nats (backwards) variable for client 
const stan = nats.connect('ticketmaster', 'abc', {
  url: 'http://localhost:4222'
});

stan.on('connect', async () => {
  console.log('publisher connected to NATS');
  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '123',
      title: 'concert',
      price: 20,
      userId: '123'
    });
  } catch (err) {
    console.log('publishing error:', err);
  }
});