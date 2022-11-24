import { InjectRepository } from "@nestjs/typeorm";
import { CoachMapper } from "src/accounts/application/mappers/coach.mapper";
import { Coach } from "src/accounts/domain/aggregates/account/coach.entity";
import { CoachRepository } from "src/accounts/domain/aggregates/account/coach.repository";
import { Repository } from "typeorm";
import { CoachEntity } from "../entities/coach.entity";

export class CoachEntityRepository implements CoachRepository  {
  constructor(
    @InjectRepository(CoachEntity)
    private personRepository: Repository<CoachEntity>,
  ) {}

  async create(person: Coach): Promise<Coach> {
    let personEntity: CoachEntity = CoachMapper.domainToEntity(person);
    personEntity = await this.personRepository.save(personEntity);
    return CoachMapper.entityToDomain(personEntity);
  }

  async update(person: Coach): Promise<Coach> {
    let personEntity: CoachEntity = CoachMapper.domainToEntity(person);
    let personId: number = person.getId().getValue();
    await this.personRepository.update({ id: personId }, personEntity);
    return person;
  }

  async delete(personId: number): Promise<boolean> {
    await this.personRepository.delete({ id: personId });
    return true;
  }

  async getById(id: number): Promise<Coach> {
    let personEntity: CoachEntity = await this.personRepository.findOne({ where: { id: id } });
    return CoachMapper.entityToDomain(personEntity);
  }

  async getBySalary(salary: number): Promise<Coach> {
    let personEntity: CoachEntity = await this.personRepository.createQueryBuilder().where("salary = :salary", { salary }).getOne();
    return CoachMapper.entityToDomain(personEntity);
  }
  async getByCard(card: string): Promise<Coach> {
    let personEntity: CoachEntity = await this.personRepository.createQueryBuilder().where("card = :card", { card }).getOne();
    return CoachMapper.entityToDomain(personEntity);
  }
}