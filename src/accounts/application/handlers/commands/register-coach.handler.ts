import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCoach } from '../../messages/commands/register-coach.command';
import { CoachMapper } from '../../mappers/coach.mapper';
import { Coach } from 'src/accounts/domain/aggregates/account/coach.entity';
import { Inject } from '@nestjs/common';
import { CoachRepository, COACH_REPOSITORY } from 'src/accounts/domain/aggregates/account/coach.repository';
import { AppSettings } from 'src/shared/application/app-settings';
import { DataSource } from 'typeorm';

@CommandHandler(RegisterCoach)
export class RegisterCoachHandler
  implements ICommandHandler<RegisterCoach> {
  constructor(
    private dataSource: DataSource,
    @Inject(COACH_REPOSITORY)
    private readonly personRepository: CoachRepository,
    private publisher: EventPublisher
  ) {
  }

  async execute(command: RegisterCoach) {
    let person: Coach = CoachMapper.commandToDomain(command, AppSettings.SUPER_ADMIN);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      person = await this.personRepository.create(person);
      if (person == null) throw new Error("");
      person = this.publisher.mergeObjectContext(person);
      person.register();
      person.commit();
      await queryRunner.commitTransaction();
    } catch(err) {
      await queryRunner.rollbackTransaction();
      person = null;
    } finally {
      await queryRunner.release();
    }
    return person;
  }
}