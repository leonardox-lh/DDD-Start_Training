import { Module } from '@nestjs/common';
import { CoachApplicationService } from './application/services/coach-application.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterClientValidator } from './application/validators/register-client.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterCoachHandler } from './application/handlers/commands/register-coach.handler';
import { ClientRegisteredHandler } from '../notifications/application/handlers/events/client-registered.handler';
import { GetClientAccountsHandler } from './application/handlers/queries/get-client-accounts.handler';
import { ClientApplicationService } from './application/services/client-application.service';
import { RegisterCoachValidator } from './application/validators/register-coach.validator';
import { RegisterClientHandler } from './application/handlers/commands/register-client.handler';
import { CoachRegisteredHandler } from '../notifications/application/handlers/events/coach-registered.handler';
import { AccountEntity } from './infrastructure/persistence/entities/account.entity';
import { ClientEntity } from './infrastructure/persistence/entities/client.entity';
import { CoachEntity } from './infrastructure/persistence/entities/coach.entity';
import { ClientController } from './interface/rest/client.controller';
import { CoachController } from './interface/rest/coach.controller';
import { ClientEntityRepository } from './infrastructure/persistence/repositories/client.repository';
import { CoachEntityRepository } from './infrastructure/persistence/repositories/coach.repository';
import { GetCoachAccountsHandler } from './application/handlers/queries/get-coach-accounts.handler';
import { CLIENT_REPOSITORY } from './domain/aggregates/account/client.repository';
import { COACH_REPOSITORY } from './domain/aggregates/account/coach.repository';

export const CommandHandlers = [RegisterClientHandler, RegisterCoachHandler];
export const EventHandlers = [ClientRegisteredHandler, CoachRegisteredHandler];
export const QueryHandlers = [GetClientAccountsHandler, GetCoachAccountsHandler];

@Module({
  imports: [
  CqrsModule,
    TypeOrmModule.forFeature([AccountEntity, ClientEntity, CoachEntity]),
  ],
  exports: [TypeOrmModule],
  controllers: [ClientController, CoachController],
  providers: [
    { useClass: ClientEntityRepository, provide: CLIENT_REPOSITORY },
    { useClass: CoachEntityRepository, provide: COACH_REPOSITORY },
    ClientApplicationService,
    CoachApplicationService,
    RegisterCoachValidator,
    RegisterClientValidator,
    ClientEntityRepository,
    CoachEntityRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class ClientsModule {}
