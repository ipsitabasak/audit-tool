import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'; 
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://Ipsita:FmaKQbNs83CgR3uV@cluster0.wzcnu.gcp.mongodb.net/nestjs-audit-app?retryWrites=true&w=majority`),
    AuditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
