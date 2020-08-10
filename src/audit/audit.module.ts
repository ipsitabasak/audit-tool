import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditSchema } from './schemas/audit.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Audit', schema: AuditSchema }]),
  ],
  providers: [AuditService],
  controllers: [AuditController]
})
export class AuditModule {}
