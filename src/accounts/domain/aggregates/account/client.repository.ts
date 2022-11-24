import { Client } from "./client.entity";

export const CLIENT_REPOSITORY = 'ClientRepository';

export interface ClientRepository {
  create(client: Client): Promise<Client>;
  update(client: Client): Promise<Client>;
  delete(clientId: number): Promise<boolean>;
  getById(id: number): Promise<Client>;
  getByDni(dni: string): Promise<Client>;
  getByCard(card: string): Promise<Client>;
}