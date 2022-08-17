import nats from 'node-nats-streaming';
import TicketCreatedListener from './events/ticket-created-listener';

console.clear();

const stan = nats.connect('ticketmaster', '123', {
  url: 'http://localhost:4222'
});

stan.on('connect', () => {
  console.log('Listener connected on NATS');

  new TicketCreatedListener(stan).listen();
});

