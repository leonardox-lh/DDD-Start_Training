import { Column, Unique } from 'typeorm';

export class CardValue {
  @Column('varchar', { name: 'card', length: 12, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): CardValue {
    return new CardValue(value);
  }
}