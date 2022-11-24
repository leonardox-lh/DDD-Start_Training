export class RegisterClientResponse {
  constructor(
    public id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly gender: string,
    public readonly dni: string,
    public readonly card: string,
    public readonly createdAt: string,
    public readonly createdBy: number
  ) {}
}