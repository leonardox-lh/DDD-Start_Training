import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
import { Result } from 'typescript-result';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterCoachRequest } from 'src/accounts/application/dtos/request/register-coach-request.dto';
import { CoachApplicationService } from 'src/accounts/application/services/coach-application.service';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterCoachResponse } from 'src/accounts/application/dtos/response/register-coach-response.dto';
import { ApiController } from 'src/shared/interface/rest/api.controller';
import { GetCoachAccounts } from 'src/accounts/application/messages/commands/queries/get-coach-accounts.query';

@Controller('account/coach')
export class CoachController {
  constructor(
    private readonly coachApplicationService: CoachApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('')
  async register(
    @Body() registerPersonRequest: RegisterCoachRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterCoachResponse> = await this.coachApplicationService.register(registerPersonRequest);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('')
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetCoachAccounts());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const person = await this.coachApplicationService.getById(id);
      return ApiController.ok(response, person);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}