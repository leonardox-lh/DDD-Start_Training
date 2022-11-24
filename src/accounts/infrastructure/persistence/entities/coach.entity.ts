import { ChildEntity, Column } from 'typeorm';
import { AccountType } from '../../../domain/aggregates/account/account-type.enum';
import { SalaryValue } from '../values/salary.value';
import { GenderValue } from '../values/gender.value';
import { CardValue } from '../values/card.value';
import { NameValue } from '../values/name.value';
import { AccountEntity } from './account.entity';

@ChildEntity(AccountType.COACH)
export class CoachEntity extends AccountEntity {
  @Column((type) => NameValue, { prefix: false })
  public name: NameValue;

  @Column((type) => GenderValue, { prefix: false })
  public gender: GenderValue;

  @Column((type) => CardValue, { prefix: false })
  public card: CardValue;

  @Column((type) => SalaryValue, { prefix: false })
  public salary: SalaryValue;
}