import { Test, TestingModule } from '@nestjs/testing';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';
import { CreateAuditDTO } from './dto/create-audit.dto';

describe('Audit Controller', () => {
  let auditController: AuditController;
  let auditService: AuditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditController],
      providers: [
        {
          provide: AuditService,
          useValue: {
            addAudit: () => {},
            getAudit: () => {},
            getAudits: () => {},
            editAudit: () => 'abcd',
            deleteAudit: () => 'deleted'
          }
        }
      ]
    }).compile();

    auditService = module.get<AuditService>(AuditService);
    auditController = module.get<AuditController>(AuditController);
  });

  it('should be defined', () => {
    expect(auditController).toBeDefined();
  });

  it('should call addAudit and should add audit to the DB successfully', async () => {
    const AuditBody: CreateAuditDTO = {
      id: 'randomID',
      name: 'abcd',
      projectName: 'TCP',
      status: 'ongoing',
      reviewerId: 'sdfsdf',
      categoryId: 'retail',
      progress: 20,
      priority: 'low',
      creatorId: 'sdfd',
      createdOn: new Date(),
      modifiedOn: new Date()
    }
    const result = {
      status: jest.fn().mockReturnValue({json: () => 'Success'})
    };
    jest.spyOn(auditService, 'addAudit').mockImplementation((res) => Promise.resolve(res));
    const auditRetVal = await auditController.addAudit(result, AuditBody);
    expect(auditRetVal).toEqual('Success');
  });

  it('should call getAudit and return all audits successfully', async () => {
    const AuditBody: CreateAuditDTO = {
      id: 'randomID',
      name: 'abcd',
      projectName: 'TCP',
      status: 'ongoing',
      reviewerId: 'sdfsdf',
      categoryId: 'retail',
      progress: 20,
      priority: 'low',
      creatorId: 'sdfd',
      createdOn: new Date(),
      modifiedOn: new Date()
    }
    const result = {
      status: jest.fn().mockReturnValue({json: () => 'Success'})
    };
    jest.spyOn(auditService, 'getAudit').mockImplementation((res) => Promise.resolve(res));
    const auditRetVal = await auditController.getAudit(result, AuditBody);
    expect(auditRetVal).toEqual('Success');
  });

  it('should call getAudit and not return success in case of no audits', async () => {
    const AuditBody: CreateAuditDTO = null;
    const result = {
      status: jest.fn().mockReturnValue({json: () => 'Success'})
    };
    try {
      jest.spyOn(auditService, 'getAudit').mockImplementation((res) => Promise.resolve(res));
      const auditRetVal = await auditController.getAudit(result, AuditBody);
    } catch(e) {
      expect(e.message).toEqual('Audit does not exist!');
    }
  });

  it('should call getAudits return success in case of audits are returned', async () => {
    const AuditRes: [CreateAuditDTO] = [{
      id: 'randomID',
      name: 'abcd',
      projectName: 'TCP',
      status: 'ongoing',
      reviewerId: 'sdfsdf',
      categoryId: 'retail',
      progress: 20,
      priority: 'low',
      creatorId: 'sdfd',
      createdOn: new Date(),
      modifiedOn: new Date()
    }];
    const result = {
      status: jest.fn().mockReturnValue({json: () => AuditRes})
    };
    jest.spyOn(auditService, 'getAudit').mockImplementation((res) => Promise.resolve(res));
    const auditRetVal = await auditController.getAudits(result);
    expect(auditRetVal).toEqual(AuditRes);
  });

  it('should call editAudit return success in case of audit is updated successfully', async () => {
    const AuditBody: CreateAuditDTO = {
      id: 'new random id',
      name: 'abcd',
      projectName: 'TCP',
      status: 'ongoing',
      reviewerId: 'sdfsdf',
      categoryId: 'retail',
      progress: 20,
      priority: 'low',
      creatorId: 'sdfd',
      createdOn: new Date(),
      modifiedOn: new Date()
    };
    const result = {
      status: jest.fn().mockReturnValue({json: () => 'Success'})
    };
    jest.spyOn(auditService, 'editAudit').mockImplementation((res) => Promise.resolve(res));
    const auditRetVal = await auditController.editAudit(result, '12323233', AuditBody);
    expect(auditRetVal).toEqual('Success');
  });

  it('should call editAudit return success in case of audit is updated successfully', async () => {
    const AuditBody: CreateAuditDTO = {
      id: 'new random id',
      name: 'abcd',
      projectName: 'TCP',
      status: 'ongoing',
      reviewerId: 'sdfsdf',
      categoryId: 'retail',
      progress: 20,
      priority: 'low',
      creatorId: 'sdfd',
      createdOn: new Date(),
      modifiedOn: new Date()
    };
    const result = {
      status: jest.fn().mockReturnValue({json: () => 'Success'})
    };
    try {
      jest.spyOn(auditService, 'editAudit').mockImplementation((res) => Promise.resolve(res));
      await auditController.editAudit(result, null, AuditBody);
    } catch(e) {
      expect(e.message).toEqual('Audit does not exist!');
    }
  });

  it('should call delete Audit return success in case of audit is deleted successfully', async () => {
    const result = {
      status: jest.fn().mockReturnValue({json: () => 'Success'})
    };
    jest.spyOn(auditService, 'deleteAudit').mockImplementation((res) => Promise.resolve(res));
    const auditRetVal = await auditController.deleteAudit(result, '12323233');
    expect(auditRetVal).toEqual('Success');
  });


  it('should call deleteAudit return error in case of audit is not deleted', async () => {
    const result = {
      status: jest.fn().mockReturnValue({json: () => 'Success'})
    };
    try {
    jest.spyOn(auditService, 'deleteAudit').mockImplementation((res) => Promise.resolve(res));
    await auditController.deleteAudit(result, null);
    } catch(e) {
      expect(e.message).toEqual('Audit does not exist!');
    }
  });
});
