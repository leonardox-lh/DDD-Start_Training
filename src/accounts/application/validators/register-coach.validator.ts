import { Inject, Injectable } from '@nestjs/common';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterCoach } from '../messages/commands/register-coach.command';
import { CoachRepository, COACH_REPOSITORY } from 'src/accounts/domain/aggregates/account/coach.repository';
import { Coach } from 'src/accounts/domain/aggregates/account/coach.entity';

@Injectable()
export class RegisterCoachValidator {
  constructor(
    @Inject(COACH_REPOSITORY)
    private personRepository: CoachRepository,
  ) {
  }

  public async validate(registerPerson: RegisterCoach,): Promise<AppNotification> {
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
    const card: string = registerPerson.card ? registerPerson.card.trim() : '';
    if (card.length <= 0) {
      notification.addError('card is required', null);
    }

    const salary: number = registerPerson.salary ? registerPerson.salary:0;
    if (salary <= 0) {
      notification.addError('salary is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }
    const client: Coach = await this.personRepository.getByCard(card);
    if (client != null) notification.addError('card is taken', null);
    
    return notification;
  }
}