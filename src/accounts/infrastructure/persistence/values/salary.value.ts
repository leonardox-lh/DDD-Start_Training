import { Column, Unique } from 'typeorm';

export class SalaryValue {
  @Column('varchar', { name: 'salary', length: 8, nullable: false })
  value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): SalaryValue {
    return new SalaryValue(value);
  }
}