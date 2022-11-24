import { ChildEntity, Column } from 'typeorm';
import { AccountType } from '../../../domain/aggregates/account/account-type.enum';
import { DniValue } from '../values/dni.value';
import { GenderValue } from '../values/gender.value';
import { CardValue } from '../values/card.value';
import { NameValue } from '../values/name.value';
import { AccountEntity } from './account.entity';

@ChildEntity(AccountType.CLIENT)
export class ClientEntity extends AccountEntity {
  @Column((type) => NameValue, { prefix: false })
  public name: NameValue;

  @Column((type) => GenderValue, { prefix: false })
  public gender: GenderValue;

  @Column((type) => DniValue, { prefix: false })
  public dni: DniValue;

  @Column((type) => CardValue, { prefix: false })
  public card: CardValue;
}