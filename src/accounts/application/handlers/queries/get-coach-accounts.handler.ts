import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { CoachAccountDto } from '../../dtos/response/coach-account.dto';
import { GetCoachAccounts } from '../../messages/commands/queries/get-coach-accounts.query';
import { CoachMapper } from '../../mappers/coach.mapper';

@QueryHandler(GetCoachAccounts)
export class GetCoachAccountsHandler implements IQueryHandler<GetCoachAccounts> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetCoachAccounts) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT 
      id,
      first_name as firstName,
      last_name as lastName,
      dni
    FROM 
      clients
    WHERE
      type = 'P'
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