import { AccountId } from 'src/accounts/domain/aggregates/account/account-id.value';
import { DateTime } from './date-time.value';

export class AuditTrail {
  private readonly createdAt: DateTime;
  private readonly createdBy: AccountId;
  private readonly updatedAt: DateTime;
  private readonly updatedBy: AccountId;

  private constructor(createdAt: DateTime, createdBy: AccountId, updatedAt: DateTime, updatedBy: AccountId) {
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
  }

  public static from(createdAt: DateTime, createdBy: AccountId, updatedAt: DateTime, updatedBy: AccountId) {
    return new AuditTrail(createdAt, createdBy, updatedAt, updatedBy);
  }

  public getCreatedAt(): DateTime {
    return this.createdAt;
  }

  public getCreatedBy(): AccountId {
    return this.createdBy;
  }

  public getUpdatedAt(): DateTime {
    return this.updatedAt;
  }

  public getUpdatedBy(): AccountId {
    return this.updatedBy;
  }
}