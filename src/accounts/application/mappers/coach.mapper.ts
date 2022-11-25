import { Coach } from 'src/accounts/domain/aggregates/account/coach.entity';
import { AuditTrailValue } from 'src/shared/infrastructure/persistence/values/audit-trail.value';
import { RegisterCoach } from '../messages/commands/register-coach.command';
import { Name } from 'src/shared/domain/values/name.value';
import { Salary } from 'src/shared/domain/values/salary.value';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { DateTime } from 'src/shared/domain/values/date-time.value';
import { CoachFactory } from 'src/accounts/domain/factories/coach.factory';
import { CoachAccountDto } from '../dtos/response/coach-account.dto';
import { AccountId } from 'src/accounts/domain/aggregates/account/account-id.value';
import { RegisterCoachRequest } from '../dtos/request/register-coach-request.dto';
import { RegisterCoachResponse } from '../dtos/response/register-coach-response.dto';
import { CoachEntity } from 'src/accounts/infrastructure/persistence/entities/coach.entity';
import { NameValue } from   'src/accounts/infrastructure/persistence/values/name.value';
import { GenderValue } from 'src/accounts/infrastructure/persistence/values/gender.value';
import { CardValue } from 'src/accounts/infrastructure/persistence/values/card.value';
import { SalaryValue } from 'src/accounts/infrastructure/persistence/values/salary.value';
import { UserId } from 'src/users/domain/aggregates/user/user-id.value';
import { Card } from 'src/shared/domain/values/card.value';
import { Gender } from 'src/shared/domain/values/gender.value';

export class CoachMapper {
  public static dtoRequestToCommand(registerCoachRequest: RegisterCoachRequest): RegisterCoach{
    return new RegisterCoach(
        registerCoachRequest.firstName,
        registerCoachRequest.lastName,
        registerCoachRequest.gender,
        registerCoachRequest.card,
        registerCoachRequest.salary
    );
  }

  public static domainToDtoResponse(coach: Coach) {
    return new RegisterCoachResponse(
        coach.getId().getValue(),
        coach.getName().getFirstName(),
        coach.getName().getLastName(),
        coach.getGender().getValue(),
        coach.getCard().getValue(),
        coach.getSalary().getValue(),
        coach.getAuditTrail().getCreatedAt().format(),
        coach.getAuditTrail().getCreatedBy().getValue()
    );
  }
  
  public static commandToDomain(command: RegisterCoach, userId: number): Coach {
    const personName: Name = Name.create(command.firstName, command.lastName);
    const gender: Gender=Gender.create(command.gender);
    const card:Card=Card.create(command.card);
    const salary:Salary=Salary.create(command.salary);
    const auditTrail: AuditTrail = AuditTrail.from(
      DateTime.utcNow(),
      UserId.of(userId),
      null,
      null
    );
    let person: Coach = CoachFactory.from(personName,gender,card,salary, auditTrail);
    return person;
  }

  public static domainToEntity(coach: Coach): CoachEntity {
    const clientEntity: CoachEntity = new CoachEntity();
    clientEntity.name = NameValue.from(coach.getName().getFirstName(), coach.getName().getLastName());
    clientEntity.gender= GenderValue.from(coach.getGender().getValue());
    clientEntity.card= CardValue.from(coach.getCard().getValue());
    clientEntity.salary= SalaryValue.from(coach.getSalary().getValue());
    const createdAt: string = coach.getAuditTrail() != null && coach.getAuditTrail().getCreatedAt() != null ? coach.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = coach.getAuditTrail() != null && coach.getAuditTrail().getCreatedBy() != null ? coach.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = coach.getAuditTrail() != null && coach.getAuditTrail().getUpdatedAt() != null ? coach.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = coach.getAuditTrail() != null && coach.getAuditTrail().getUpdatedBy() != null ? coach.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailValue: AuditTrailValue = AuditTrailValue.from(createdAt, createdBy, updatedAt, updatedBy);
    clientEntity.auditTrail = auditTrailValue;
    return clientEntity;
  }
  public static entityToDomain(coachEntity: CoachEntity): Coach {
    if (coachEntity == null) return null;
    const personName: Name = Name.create(coachEntity.name.firstName, coachEntity.name.lastName);
    const gender: Gender=Gender.create(coachEntity.gender.value);
    const card:Card=Card.create(coachEntity.card.value);
    const salary: Salary = Salary.create(coachEntity.salary.value);
    const auditTrail: AuditTrail = AuditTrail.from(
        coachEntity.auditTrail.createdAt != null ? DateTime.fromString(coachEntity.auditTrail.createdAt) : null,
        coachEntity.auditTrail.createdBy != null ? UserId.of(coachEntity.auditTrail.createdBy) : null,
        coachEntity.auditTrail.updatedAt != null ? DateTime.fromString(coachEntity.auditTrail.updatedAt) : null,
        coachEntity.auditTrail.updatedBy != null ? UserId.of(coachEntity.auditTrail.updatedBy) : null
    );
    const clientId: AccountId = AccountId.of(coachEntity.id);
    let coach: Coach = CoachFactory.withId(clientId, personName,gender,card,salary, auditTrail);
    return coach;
  }
  public static ormToClientAccountDto(row: any): CoachAccountDto {
    let dto = new CoachAccountDto();
    dto.id = Number(row.id);
    dto.firstName = row.firstName;
    dto.lastName = row.lastName;
    dto.gender=row.gender;
    dto.card=row.card;
    dto.salary=row.salary;
    return dto;
  }
}