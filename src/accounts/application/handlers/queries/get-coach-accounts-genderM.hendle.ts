import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { ClientAccountDto } from '../../dtos/response/client-account.dto';
import { CoachAccountDto } from '../../dtos/response/coach-account.dto';
import { ClientMapper } from '../../mappers/client.mapper';
import { CoachMapper } from '../../mappers/coach.mapper';
import { GetCoachGenderMAccounts } from '../../messages/commands/queries/get-coach-accounts-genderM.query';

@QueryHandler(GetCoachGenderMAccounts)
export class GetCoachGenderMAccountsHandler implements IQueryHandler<GetCoachGenderMAccounts> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetCoachGenderMAccounts) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT 
    id,
    first_name as firstName,
    last_name as lastName,
    salary,
    gender,
    card
    

    FROM 
      accounts
    WHERE
      type = 'Co' AND gender = 'M'
      
    ORDER BY
      last_name, first_name;`;
    const rows = await manager.query(sql);
    if (rows.length <= 0) return [];
    const personClients: CoachAccountDto[] = rows.map(function (row: any) {
      return CoachMapper.ormToClientAccountDto(row);
    });
    return personClients;
  }
}