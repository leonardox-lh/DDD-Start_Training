import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ClientsModule } from './accounts/accounts.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      url: 'mysql://root:root@localhost:3306/trabajofinal-patrones',
      migrationsRun: true,
      logging: true,
      timezone: '+00:00',
      bigNumberStrings: false,
      entities: [
        process.env.ENVIRONMENT == 'prod' ? 
       
        '**/infrastructure/persistence/entities/*{.ts,.js}' : 
        'dist/**/infrastructure/persistence/entities/*{.ts,.js}'
      ],
      subscribers: [],
      migrations: [
        process.env.ENVIRONMENT == 'prod' ? 
        'shared/infrastructure/persistence/migrations/*{.ts,.js}' : 
        'dist/shared/infrastructure/persistence/migrations/*{.ts,.js}'
      ],
      migrationsTableName: "migrations"
    }),
    ClientsModule,
    UsersModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}