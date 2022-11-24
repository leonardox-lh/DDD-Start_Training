import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ClientRegistered } from '../../../../accounts/domain/events/cliente-registered.event';

@EventsHandler(ClientRegistered)
export class ClientRegisteredHandler implements IEventHandler<ClientRegistered> {
  constructor() {}

  async handle(event: ClientRegistered) {
    console.log(event);
  }
}