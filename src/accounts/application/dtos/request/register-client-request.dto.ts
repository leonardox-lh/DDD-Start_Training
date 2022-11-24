export class RegisterClientRequest {
    constructor(
      public readonly firstName: string,
      public readonly lastName: string,
      public readonly gender: string, 
      public readonly dni: string,
      public readonly card: string,
    ) {}
  }