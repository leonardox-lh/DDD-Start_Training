export class RegisterCoachRequest {
    constructor(
      public readonly firstName: string,
      public readonly lastName: string,
      public readonly gender: string, 
      public readonly card: string,
      public readonly salary: number
    ) {}
  }