import { InjectRepository } from "@nestjs/typeorm";
import { ClientMapper } from "src/accounts/application/mappers/client.mapper";
import { Client } from "src/accounts/domain/aggregates/account/client.entity";
import { ClientRepository } from "src/accounts/domain/aggregates/account/client.repository";
import { Repository } from "typeorm";
import { ClientEntity } from "../entities/client.entity";

export class ClientEntityRepository implements ClientRepository  {
  constructor(
    @InjectRepository(ClientEntity)
    private personRepository: Repository<ClientEntity>,
  ) {}

  async create(person: Client): Promise<Client> {
    let personEntity: ClientEntity = ClientMapper.domainToEntity(person);
    personEntity = await this.personRepository.save(personEntity);
    return ClientMapper.entityToDomain(personEntity);
  }

  async update(person: Client): Promise<Client> {
    let personEntity: ClientEntity = ClientMapper.domainToEntity(person);
    let personId: number = person.getId().getValue();
    await this.personRepository.update({ id: personId }, personEntity);
    return person;
  }

  async delete(personId: number): Promise<boolean> {
    await this.personRepository.delete({ id: personId });
    return true;
  }

  async getById(id: number): Promise<Client> {
    let personEntity: ClientEntity = await this.personRepository.findOne({ where: { id: id } });
    return ClientMapper.entityToDomain(personEntity);
  }

  async getByDni(dni: string): Promise<Client> {
    let personEntity: ClientEntity = await this.personRepository.createQueryBuilder().where("dni = :dni", { dni }).getOne();
    return ClientMapper.entityToDomain(personEntity);
  }

  async getByCard(card: string): Promise<Client> {
    let personEntity: ClientEntity = await this.personRepository.createQueryBuilder().where("card = :card", { card }).getOne();
    return ClientMapper.entityToDomain(personEntity);
  }
}