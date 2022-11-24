import { AccountId } from './account-id.value';
import { Account } from './account.root.entity';
import { Salary } from '../../../../shared/domain/values/salary.value';
import { Name } from 'src/shared/domain/values/name.value';
import { Card } from '../../../../shared/domain/values/card.value';
import { Gender } from '../../../../shared/domain/values/gender.value';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { AccountType } from 'src/accounts/domain/aggregates/account/account-type.enum';
import { CoachRegistered } from 'src/accounts/domain/events/coach-registered.evet';


export class Coach extends Account {
  private name: Name;
  private salary: Salary;
  private card: Card;
  private gender: Gender;

  public constructor(name: Name,gender:Gender,card:Card, salary: Salary, auditTrail: AuditTrail) {
    super(AccountType.COACH, auditTrail);
    this.name = name;
    this.gender=gender;
    this.card=card;
    this.salary = salary;
  }

  public register() {
    const event = new CoachRegistered(this.id.getValue(), this.name.getFirstName(),this.gender.getValue(),this.card.getValue(), this.salary.getValue());
    this.apply(event);
  }

  public getId(): AccountId {
    return this.id;
  }

  public getName(): Name {
    return this.name;
  }

  public getGender(): Gender {
    return this.gender;
  }

  public getCard(): Card {
    return this.card;
  }

  public getSalary(): Salary {
    return this.salary;
  }

  public changeName(name: Name): void {
    this.name = name;
  }

  public changeCard(card: Card): void {
    this.card = card;
  }

  public changeSalary(salary: Salary): void {
    this.salary = salary;
  }
}