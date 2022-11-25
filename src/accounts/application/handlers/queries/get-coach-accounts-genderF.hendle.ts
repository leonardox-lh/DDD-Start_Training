import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { ClientAccountDto } from '../../dtos/response/client-account.dto';
import { CoachAccountDto } from '../../dtos/response/coach-account.dto';
import { ClientMapper } from '../../mappers/client.mapper';
import { CoachMapper } from '../../mappers/coach.mapper';
import { GetCoachGenderFAccounts } from '../../messages/commands/queries/get-coach-accounts-genderF.query';

@QueryHandler(GetCoachGenderFAccounts)
export class GetCoachGenderFAccountsHandler implements IQueryHandler<GetCoachGenderFAccounts> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetCoachGenderFAccounts) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT 
     id,
      first_name as firstName,
      last_name as lastName,
      gender,
      card,
      salary

    FROM 
      accounts
    WHERE
      type = 'Co' AND gender = 'F'
      
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