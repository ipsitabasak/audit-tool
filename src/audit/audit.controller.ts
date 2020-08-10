import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { AuditService } from './audit.service';
import { CreateAuditDTO } from './dto/create-audit.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('audit')
export class AuditController {

  constructor(private auditService: AuditService) { }

  // Submit a audit
  @Post('/audit')
  async addAudit(@Res() res, @Body() createAuditDTO: CreateAuditDTO) {
    const newAudit = await this.auditService.addAudit(createAuditDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Audit has been submitted successfully!',
      audit: newAudit,
    });
  }

  // Fetch a particular audit using ID
  @Get('audit/:auditID')
  async getAudit(@Res() res, @Param('auditID', new ValidateObjectId()) auditID) {
    const audit = await this.auditService.getAudit(auditID);
    if (!audit) {
        throw new NotFoundException('Audit does not exist!');
    }
    return res.status(HttpStatus.OK).json(audit);
  }

  // Fetch all audits
  @Get('audits')
  async getAudits(@Res() res) {
    const audits = await this.auditService.getAudits();
    return res.status(HttpStatus.OK).json(audits);
  }

   // Edit a particular audit using ID
   @Put('/edit')
   async editAudit(
     @Res() res,
     @Query('auditID', new ValidateObjectId()) auditID,
     @Body() createAuditDTO: CreateAuditDTO,
   ) {
     const editedAudit = await this.auditService.editAudit(auditID, createAuditDTO);
     if (!editedAudit) {
         throw new NotFoundException('Audit does not exist!');
     }
     return res.status(HttpStatus.OK).json({
       message: 'Audit has been successfully updated',
       audit: editedAudit,
     });
   }
   // Delete a audit using ID
   @Delete('/delete')
   async deleteAudit(@Res() res, @Query('auditID', new ValidateObjectId()) auditID) {
     const deletedAudit = await this.auditService.deleteAudit(auditID);
     if (!deletedAudit) {
         throw new NotFoundException('Audit does not exist!');
     }
     return res.status(HttpStatus.OK).json({
       message: 'Audit has been deleted!',
       audit: deletedAudit,
     });
   }
}