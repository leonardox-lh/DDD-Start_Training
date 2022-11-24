export class ClientRegistered {
    constructor(
      public readonly id: number,
      public readonly name: string,
      public readonly gender: string,
      public readonly dni: string,
      public readonly card: string,
    ) {
    }
  }