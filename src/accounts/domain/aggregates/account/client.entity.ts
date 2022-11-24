import { AccountType } from 'src/accounts/domain/aggregates/account/account-type.enum';
import { ClientRegistered } from 'src/accounts/domain/events/cliente-registered.event';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { Name } from 'src/shared/domain/values/name.value';
import { AccountId } from './account-id.value';
import { Dni } from '../../../../shared/domain/values/dni.value';
import { Card } from '../../../../shared/domain/values/card.value';
import { Gender } from '../../../../shared/domain/values/gender.value';
import { Account } from './account.root.entity';
import { GeneratedMetadataArgs } from 'typeorm/metadata-args/GeneratedMetadataArgs';

export class Client extends Account {
  private name: Name;
  private dni: Dni;
  private card: Card;
  private gender: Gender;

  public constructor(name: Name,gender:Gender, dni: Dni, card:Card, auditTrail: AuditTrail) {
    super(AccountType.CLIENT, auditTrail);
    this.name = name;
    this.gender=gender;
    this.dni = dni;
    this.card=card;
  }

  public register() {
    const event = new ClientRegistered(this.id.getValue(), this.name.getFirstName(),this.gender.getValue(), this.dni.getValue(), this.card.getValue());
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

  public getDni(): Dni {
    return this.dni;
  }

  public getCard(): Card {
    return this.card;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeName(name: Name): void {
    this.name = name;
  }

  public changeGender(gender: Gender): void {
    this.gender = gender;
  }

  public changeDni(dni: Dni): void {
    this.dni = dni;
  }

  public changeCard(card: Card): void {
    this.card = card;
  }
}