
export class Salary {
  private value: number;
  private static MAX_LENGTH: number = 11;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(salary: number): Salary
  {
    return new Salary(salary);
  }

  public getValue(): number {
    return this.value;
  }
}