import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'; 
import { AuditModule } from './audit/audit.module';
import { mongoConfig } from '../config/config';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://${mongoConfig}/nestjs-audit-app?retryWrites=true&w=majority`),
    AuditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
