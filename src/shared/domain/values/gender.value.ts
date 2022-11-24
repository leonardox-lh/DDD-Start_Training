export class Gender {
    private value: string;
  
    private constructor(value: string) {
      this.value = value;
    }
  
    public static create(gender: string): Gender
    {
      return new Gender(gender);
    }
  
    public getValue(): string {
      return this.value;
    }
  }