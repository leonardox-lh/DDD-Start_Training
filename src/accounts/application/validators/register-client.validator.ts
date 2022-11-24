import { Inject, Injectable } from '@nestjs/common';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterClient } from '../messages/commands/register-client.command';
import { ClientRepository, CLIENT_REPOSITORY } from 'src/accounts/domain/aggregates/account/client.repository';
import { Client } from 'src/accounts/domain/aggregates/account/client.entity';

@Injectable()
export class RegisterClientValidator {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private personRepository: ClientRepository,
  ) {
  }

  public async validate(registerPerson: RegisterClient,): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const firstName: string = registerPerson.firstName ? registerPerson.firstName.trim() : '';
    if (firstName.length <= 0) {
      notification.addError('firstName is required', null);
    }
    const lastName: string = registerPerson.lastName ? registerPerson.lastName.trim() : '';
    if (lastName.length <= 0) {
      notification.addError('lastName is required', null);
    }
    const gender: string = registerPerson.gender ? registerPerson.gender.trim() : '';
    if (gender.length <= 0) {
      notification.addError('gender is required', null);
    }
    const dni: string = registerPerson.dni ? registerPerson.dni.trim() : '';
    if (dni.length <= 0) {
      notification.addError('dni is required', null);
    }
    const card: string = registerPerson.card ? registerPerson.card.trim() : '';
    if (card.length <= 0) {
      notification.addError('card is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const person: Client = await this.personRepository.getByDni(dni);
    if (person != null) notification.addError('dni is taken', null);
    
    const client: Client = await this.personRepository.getByCard(card);
    if (client != null) notification.addError('card is taken', null);

    return notification;
  }
}