import { AuditTrail } from '../../../shared/domain/values/audit-trail.value';
import { Name } from 'src/shared/domain/values/name.value';
import { AccountId } from '../aggregates/account/account-id.value';
import { Gender } from 'src/shared/domain/values/gender.value';
import { Card } from 'src/shared/domain/values/card.value';
import { Coach } from '../aggregates/account/coach.entity';
import { Salary } from 'src/shared/domain/values/salary.value';

export class CoachFactory {
    public static withId(id: AccountId, name: Name, gender: Gender, card:Card, salary:Salary, auditTrail: AuditTrail): Coach {
      let coach: Coach = new Coach(name,gender,card,salary, auditTrail);
      coach.changeId(id);
      return coach;
    }
  
    public static from(name: Name,gender:Gender,card:Card,salary:Salary, auditTrail: AuditTrail): Coach {
      return new Coach(name,gender,card,salary, auditTrail);
    }
  }