import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterClient } from '../../messages/commands/register-client.command';
import { ClientMapper } from '../../mappers/client.mapper';
import { Client } from 'src/accounts/domain/aggregates/account/client.entity';
import { Inject } from '@nestjs/common';
import { ClientRepository, CLIENT_REPOSITORY } from 'src/accounts/domain/aggregates/account/client.repository';
import { AppSettings } from 'src/shared/application/app-settings';
import { DataSource } from 'typeorm';

@CommandHandler(RegisterClient)
export class RegisterClientHandler
  implements ICommandHandler<RegisterClient> {
  constructor(
    private dataSource: DataSource,
    @Inject(CLIENT_REPOSITORY)
    private readonly personRepository: ClientRepository,
    private publisher: EventPublisher
  ) {
  }

  async execute(command: RegisterClient) {
    let person: Client = ClientMapper.commandToDomain(command, AppSettings.SUPER_ADMIN);
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