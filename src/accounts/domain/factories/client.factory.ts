import { AuditTrail } from '../../../shared/domain/values/audit-trail.value';
import { Name } from 'src/shared/domain/values/name.value';
import { Client } from '../aggregates/account/client.entity';
import { AccountId } from '../aggregates/account/account-id.value';
import { Dni } from '../../../shared/domain/values/dni.value';
import { Gender } from 'src/shared/domain/values/gender.value';
import { Card } from 'src/shared/domain/values/card.value';

export class ClientFactory {
  public static withId(id: AccountId, name: Name, gender: Gender, dni: Dni, card:Card, auditTrail: AuditTrail): Client {
    let client: Client = new Client(name,gender, dni,card, auditTrail);
    client.changeId(id);
    return client;
  }

  public static from(name: Name,gender:Gender, dni: Dni,card:Card, auditTrail: AuditTrail): Client {
    return new Client(name,gender, dni,card, auditTrail);
  }
}