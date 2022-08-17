import { Message } from 'node-nats-streaming';

import Listener from '../../../common/src/events/base-listener';
import Subjects from '../../../common/src/events/subjects';
import { TicketCreatedEvent } from '../../../common/src/events/event-definitions';

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event Data', data);

    msg.ack();
  }
}

export default TicketCreatedListener;