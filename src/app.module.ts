import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TicketsModule } from './tickets/tickets.module';
import { TicketsDiscussionsModule } from './tickets-discussions/tickets-discussions.module';
import { TicketMiddleware } from './middleware/ticket.middleware';
import { TicketEntity } from './tickets/entity/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TicketsModule,
    TicketsDiscussionsModule,
    TypeOrmModule.forFeature([TicketEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TicketMiddleware)
      .forRoutes({ path: 'tickets-discussions', method: RequestMethod.ALL });
  }
}
