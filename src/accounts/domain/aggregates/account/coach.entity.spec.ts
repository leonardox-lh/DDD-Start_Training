import { AccountId } from "./account-id.value";
import { AuditTrail } from "src/shared/domain/values/audit-trail.value";
import { Name } from "src/shared/domain/values/name.value";
import { Gender } from "src/shared/domain/values/gender.value";
import { Card } from "src/shared/domain/values/card.value";
import { Coach } from "./coach.entity";
import { Salary } from "src/shared/domain/values/salary.value";
import { CoachFactory } from "../../factories/coach.factory";

describe('Account', () => {
  let coach: Coach;
  let accountId: AccountId;
  let name:Name;
  let gender:Gender;
  let card:Card;
  let auditTrail:AuditTrail;

  beforeEach(() => {
    accountId = AccountId.of(1);
  });

  describe('changesalary', () => {
    it('should be deposited', () => {
      const salary:Salary=Salary.create(50);
      const new_salary:Salary=Salary.create(70);

      coach= CoachFactory.withId(accountId,name,gender,card,salary,auditTrail);
      coach.changeSalary(new_salary);
      
      expect(coach.getSalary()).toBe(new_salary);
    });
  });

});