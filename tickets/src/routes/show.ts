import { NotFoundError } from '@favpublic/common';
import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';

import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', 
  param('id')
    .isMongoId()
    .withMessage('id is not correct'),
  async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    console.log('e')
    throw new NotFoundError();
  }

  res.send(ticket);

});

export { router as showTicketRouter };