import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterCoachRequest } from '../dtos/request/register-coach-request.dto';
import { RegisterCoachResponse } from '../dtos/response/register-coach-response.dto';
import { RegisterCoachValidator } from '../validators/register-coach.validator';
import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterCoach } from '../messages/commands/register-coach.command';
import { CoachRepository, COACH_REPOSITORY } from 'src/accounts/domain/aggregates/account/coach.repository';
import { Coach } from 'src/accounts/domain/aggregates/account/coach.entity';
import { CoachMapper } from '../mappers/coach.mapper';

@Injectable()
export class CoachApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerPersonValidator: RegisterCoachValidator,
    @Inject(COACH_REPOSITORY)
    private readonly personRepository: CoachRepository,
  ) {}

  async register(
    registerPersonRequest: RegisterCoachRequest,
  ): Promise<Result<AppNotification, RegisterCoachResponse>> {
    const registerPerson: RegisterCoach = CoachMapper.dtoRequestToCommand(registerPersonRequest);
    const notification: AppNotification = await this.registerPersonValidator.validate(registerPerson);
    if (notification.hasErrors()) return Result.error(notification);
    const person: Coach = await this.commandBus.execute(registerPerson);
    const response: RegisterCoachResponse = CoachMapper.domainToDtoResponse(person);
    return Result.ok(response);
  }

  async getById(id: number) {
    return await this.personRepository.getById(id);
  }
}