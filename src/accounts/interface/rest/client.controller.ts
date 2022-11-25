import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
import { Result } from 'typescript-result';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterClientRequest } from 'src/accounts/application/dtos/request/register-client-request.dto';
import { ClientApplicationService } from 'src/accounts/application/services/client-application.service';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterClientResponse } from 'src/accounts/application/dtos/response/register-client-response.dto';
import { ApiController } from 'src/shared/interface/rest/api.controller';
import { GetClientAccounts } from 'src/accounts/application/messages/commands/queries/get-client-accounts.query';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetClientGenderMAccounts } from 'src/accounts/application/messages/commands/queries/get-client-accounts-genderM.query';
import { GetClientGenderFAccounts } from 'src/accounts/application/messages/commands/queries/get-client-accounts-genderF.query';

@Controller('account/client')
@ApiTags('clients accounts')
export class ClientController {
  constructor(
    private readonly clientApplicationService: ClientApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Register account client' })
  async register(
    @Body() registerPersonRequest: RegisterClientRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterClientResponse> = await this.clientApplicationService.register(registerPersonRequest);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('')
  @ApiOperation({ summary: 'see list of clients' })
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetClientAccounts());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  
  @Get('/:Gender')
  @ApiOperation({ summary: 'see list of clients by gender' })
  async getByGender(@Param('Gender') gender: string,@Res({ passthrough: true }) response): Promise<object> {
    if(gender=='M'){
      try {
        const customers = await this.queryBus.execute(new GetClientGenderMAccounts());
        return ApiController.ok(response, customers);
      } catch (error) {
        return ApiController.serverError(response, error);
      }
    };
    try {
      const customers = await this.queryBus.execute(new GetClientGenderFAccounts());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    } 
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'see client by id' })
  async getById(@Param('id') id: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const person = await this.clientApplicationService.getById(id);
      return ApiController.ok(response, person);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

}