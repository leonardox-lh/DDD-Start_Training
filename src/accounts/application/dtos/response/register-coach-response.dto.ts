export class RegisterCoachResponse {
    constructor(
      public id: number,
      public readonly firstName: string,
      public readonly lastName: string,
      public readonly gender: string,
      public readonly card: string,
      public readonly salary: number,
      public readonly createdAt: string,
      public readonly createdBy: number
    ) {}
  }