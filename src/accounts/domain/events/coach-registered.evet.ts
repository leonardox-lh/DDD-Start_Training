export class CoachRegistered {
    constructor(
      public readonly id: number,
      public readonly name: string,
      public readonly gender: string,
      public readonly card: string,
      public readonly salary: number,
    ) {
    }
  }