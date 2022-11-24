import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { CoachRegistered } from '../../../../accounts/domain/events/coach-registered.evet';

@EventsHandler(CoachRegistered)
export class CoachRegisteredHandler implements IEventHandler<CoachRegistered> {
  constructor() {}

  async handle(event: CoachRegistered) {
    console.log(event);
  }
}