import { AccountId } from "./account-id.value";
import { AuditTrail } from "src/shared/domain/values/audit-trail.value";
import { Client } from "./client.entity";
import { Name } from "src/shared/domain/values/name.value";
import { ClientFactory } from "../../factories/client.factory";
import { Gender } from "src/shared/domain/values/gender.value";
import { Dni } from "src/shared/domain/values/dni.value";
import { Card } from "src/shared/domain/values/card.value";

describe('Account', () => {
  let client: Client;
  let accountId: AccountId;
  let gender:Gender;
  let dni:Dni;
  let card:Card;
  let auditTrail:AuditTrail;

  beforeEach(() => {
    accountId = AccountId.of(1);
  });

  describe('changeName', () => {
    it('should be deposited', () => {
      const name:Name=Name.create("leonardo",'lopez');
      const new_name:Name=Name.create("jose",'edgar');

      client= ClientFactory.withId(accountId,name,gender,dni,card,auditTrail);
      client.changeName(new_name);
      
      expect(client.getName()).toBe(new_name);
    });
  });

});