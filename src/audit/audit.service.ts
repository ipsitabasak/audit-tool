import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Audit } from './interface/audit.interface';
import { CreateAuditDTO } from './dto/create-audit.dto';

@Injectable()
export class AuditService {
  constructor(@InjectModel('Audit') private readonly auditModel: Model<Audit>) { }

  async addAudit(createAuditDTO: CreateAuditDTO): Promise<Audit> {
    const newAudit = await this.auditModel(createAuditDTO);
    return newAudit.save();
  }  

  async getAudit(auditID): Promise<Audit> {
    const audit = await this.auditModel
      .findById(auditID)
      .exec();
    return audit;
  }

  async getAudits(): Promise<Audit[]> {
    const audits = await this.auditModel.find().exec();
    return audits;
  }

  async editAudit(auditID, createAuditDTO: CreateAuditDTO): Promise<Audit> {
    const editedAudit = await this.auditModel
      .findByIdAndUpdate(auditID, createAuditDTO, { new: true });
    return editedAudit;
  }

  async deleteAudit(auditID): Promise<any> {
    const deletedAudit = await this.auditModel
      .findByIdAndRemove(auditID);
    return deletedAudit;
  }
} 