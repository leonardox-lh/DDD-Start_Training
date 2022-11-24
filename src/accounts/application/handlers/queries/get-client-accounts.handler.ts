import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { ClientAccountDto } from '../../dtos/response/client-account.dto';
import { GetClientAccounts } from '../../messages/commands/queries/get-client-accounts.query';
import { ClientMapper } from '../../mappers/client.mapper';

@QueryHandler(GetClientAccounts)
export class GetClientAccountsHandler implements IQueryHandler<GetClientAccounts> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetClientAccounts) {
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
    const personClients: ClientAccountDto[] = rows.map(function (row: any) {
      return ClientMapper.ormToClientAccountDto(row);
    });
    return personClients;
  }
}