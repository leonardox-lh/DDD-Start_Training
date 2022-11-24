import { Client } from 'src/accounts/domain/aggregates/account/client.entity';
import { AuditTrailValue } from 'src/shared/infrastructure/persistence/values/audit-trail.value';
import { RegisterClient } from '../messages/commands/register-client.command';
import { Name } from 'src/shared/domain/values/name.value';
import { Dni } from 'src/shared/domain/values/dni.value';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { DateTime } from 'src/shared/domain/values/date-time.value';
import { ClientFactory } from 'src/accounts/domain/factories/client.factory';
import { ClientAccountDto } from '../dtos/response/client-account.dto';
import { AccountId } from 'src/accounts/domain/aggregates/account/account-id.value';
import { RegisterClientRequest } from '../dtos/request/register-client-request.dto';
import { RegisterClientResponse } from '../dtos/response/register-client-response.dto';
import { ClientEntity } from 'src/accounts/infrastructure/persistence/entities/client.entity';
import { NameValue } from 'src/accounts/infrastructure/persistence/values/name.value';
import { GenderValue } from 'src/accounts/infrastructure/persistence/values/gender.value';
import { CardValue } from 'src/accounts/infrastructure/persistence/values/card.value';
import { DniValue } from 'src/accounts/infrastructure/persistence/values/dni.value';
import { UserId } from 'src/users/domain/aggregates/user/user-id.value';
import { Card } from 'src/shared/domain/values/card.value';
import { Gender } from 'src/shared/domain/values/gender.value';

export class ClientMapper {
  public static dtoRequestToCommand(registerClientRequest: RegisterClientRequest): RegisterClient{
    return new RegisterClient(
        registerClientRequest.firstName,
        registerClientRequest.lastName,
        registerClientRequest.gender,
        registerClientRequest.dni,
        registerClientRequest.card
    );
  }

  public static domainToDtoResponse(client: Client) {
    return new RegisterClientResponse(
        client.getId().getValue(),
        client.getName().getFirstName(),
        client.getName().getLastName(),
        client.getGender().getValue(),
        client.getDni().getValue(),
        client.getCard().getValue(),
        client.getAuditTrail().getCreatedAt().format(),
        client.getAuditTrail().getCreatedBy().getValue()
    );
  }
  
  public static commandToDomain(command: RegisterClient, userId: number): Client {
    const personName: Name = Name.create(command.firstName, command.lastName);
    const gender: Gender=Gender.create(command.gender);
    const dni: Dni = Dni.create(command.dni);
    const card:Card=Card.create(command.card);
    const auditTrail: AuditTrail = AuditTrail.from(
      DateTime.utcNow(),
      UserId.of(userId),
      null,
      null
    );
    let person: Client = ClientFactory.from(personName,gender, dni,card, auditTrail);
    return person;
  }

  public static domainToEntity(client: Client): ClientEntity {
    const clientEntity: ClientEntity = new ClientEntity();
    clientEntity.name = NameValue.from(client.getName().getFirstName(), client.getName().getLastName());
    clientEntity.gender= GenderValue.from(client.getGender().getValue());
    clientEntity.dni = DniValue.from(client.getDni().getValue());
    clientEntity.card= CardValue.from(client.getCard().getValue());
    const createdAt: string = client.getAuditTrail() != null && client.getAuditTrail().getCreatedAt() != null ? client.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = client.getAuditTrail() != null && client.getAuditTrail().getCreatedBy() != null ? client.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = client.getAuditTrail() != null && client.getAuditTrail().getUpdatedAt() != null ? client.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = client.getAuditTrail() != null && client.getAuditTrail().getUpdatedBy() != null ? client.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailValue: AuditTrailValue = AuditTrailValue.from(createdAt, createdBy, updatedAt, updatedBy);
    clientEntity.auditTrail = auditTrailValue;
    return clientEntity;
  }

  public static entityToDomain(clientEntity: ClientEntity): Client {
    if (clientEntity == null) return null;
    const personName: Name = Name.create(clientEntity.name.firstName, clientEntity.name.lastName);
    const gender: Gender=Gender.create(clientEntity.gender.value);
    const dni: Dni = Dni.create(clientEntity.dni.value);
    const card:Card=Card.create(clientEntity.card.value);
    const auditTrail: AuditTrail = AuditTrail.from(
        clientEntity.auditTrail.createdAt != null ? DateTime.fromString(clientEntity.auditTrail.createdAt) : null,
        clientEntity.auditTrail.createdBy != null ? UserId.of(clientEntity.auditTrail.createdBy) : null,
        clientEntity.auditTrail.updatedAt != null ? DateTime.fromString(clientEntity.auditTrail.updatedAt) : null,
        clientEntity.auditTrail.updatedBy != null ? UserId.of(clientEntity.auditTrail.updatedBy) : null
    );
    const clientId: AccountId = AccountId.of(clientEntity.id);
    let client: Client = ClientFactory.withId(clientId, personName,gender, dni,card, auditTrail);
    return client;
  }

  public static ormToClientAccountDto(row: any): ClientAccountDto {
    let dto = new ClientAccountDto();
    dto.id = Number(row.id);
    dto.firstName = row.firstName;
    dto.lastName = row.lastName;
    dto.gender=row.gender;
    dto.dni = row.dni;
    dto.card=row.card;
    return dto;
  }
}