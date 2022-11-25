import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterClientRequest } from '../dtos/request/register-client-request.dto';
import { RegisterClientResponse } from '../dtos/response/register-client-response.dto';
import { RegisterClientValidator } from '../validators/register-client.validator';
import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterClient } from '../messages/commands/register-client.command';
import { ClientRepository, CLIENT_REPOSITORY } from 'src/accounts/domain/aggregates/account/client.repository';
import { Client } from 'src/accounts/domain/aggregates/account/client.entity';
import { ClientMapper } from '../mappers/client.mapper';

@Injectable()
export class ClientApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerPersonValidator: RegisterClientValidator,
    @Inject(CLIENT_REPOSITORY)
    private readonly personRepository: ClientRepository,
  ) {}

  async register(
    registerPersonRequest: RegisterClientRequest,
  ): Promise<Result<AppNotification, RegisterClientResponse>> {
    const registerPerson: RegisterClient = ClientMapper.dtoRequestToCommand(registerPersonRequest);
    const notification: AppNotification = await this.registerPersonValidator.validate(registerPerson);
    if (notification.hasErrors()) return Result.error(notification);
    const person: Client = await this.commandBus.execute(registerPerson);
    const response: RegisterClientResponse = ClientMapper.domainToDtoResponse(person);
    return Result.ok(response);
  }

  async getById(id: number) {
    return await this.personRepository.getById(id);
  }

}