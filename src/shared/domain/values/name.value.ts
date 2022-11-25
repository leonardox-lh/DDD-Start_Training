
export class Name {
  private readonly Name: string;
  private readonly lastName: string;
  private static MAX_LENGTH: number = 75;

  private constructor(name: string, lastName: string) {
    this.Name = name;
    this.lastName = lastName;
  }

  public getFirstName(): string {
    return this.Name;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public static create(name: string, lastName: string): Name {
    name = (name ?? "").trim();
    lastName = (lastName ?? "").trim();
    return new Name(name, lastName);
  }

}