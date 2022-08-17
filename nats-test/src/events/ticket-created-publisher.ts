import Publisher from "../../../common/src/events/base-publisher";
import { TicketCreatedEvent } from "../../../common/src/events/event-definitions";
import Subjects from "../../../common/src/events/subjects";

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}

export default TicketCreatedPublisher;