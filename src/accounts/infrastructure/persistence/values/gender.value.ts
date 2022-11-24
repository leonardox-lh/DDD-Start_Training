import { Column, Unique } from 'typeorm';

export class GenderValue {
  @Column('varchar', { name: 'gender', length: 8, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): GenderValue {
    return new GenderValue(value);
  }
}