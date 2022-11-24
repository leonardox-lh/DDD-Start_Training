import { AccountType } from 'src/accounts/domain/aggregates/account/account-type.enum';
import { AuditTrailValue } from 'src/shared/infrastructure/persistence/values/audit-trail.value';
import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';

@Entity('accounts')
@TableInheritance({ column: 'type', })
export class AccountEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => AuditTrailValue, { prefix: false })
  public auditTrail: AuditTrailValue;

  @Column({ name: 'type', type: 'enum', enum: AccountType, default: AccountType.CLIENT })
  readonly type: AccountType;
}