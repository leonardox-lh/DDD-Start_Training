import { AggregateRoot } from '@nestjs/cqrs';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { AccountId } from './account-id.value';
import { AccountType } from './account-type.enum';

export class Account extends AggregateRoot {
  protected id: AccountId;
  protected type: AccountType;
  protected readonly auditTrail: AuditTrail;

  public constructor(type: AccountType, auditTrail: AuditTrail) {
    super();
    this.type = type;
    this.auditTrail = auditTrail;
  }

  public getId(): AccountId {
    return this.id;
  }

  public getType(): AccountType {
    return this.type;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: AccountId) {
    this.id = id;
  }
}