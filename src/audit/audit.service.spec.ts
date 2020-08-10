import { Test, TestingModule } from '@nestjs/testing';
import { AuditService } from './audit.service';
import { getModelToken } from '@nestjs/mongoose';
import { Audit as AuditInterface } from '../audit/interface/audit.interface';
import { DocumentQuery, Model } from 'mongoose';
import { CreateAuditDTO } from '../audit/dto/create-audit.dto';

const sampleAudit = {
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
};

describe('auditsReservice', () => {
  let service: AuditService;
  let model: Model<CreateAuditDTO>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditService,
        {
          provide: getModelToken('Audit'),
          // notice that only the functions we call from the model are mocked
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndRemove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuditService>(AuditService);
    model = module.get<Model<CreateAuditDTO>>(getModelToken('Audit'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return audit when getAudit with ID is called', async () => {
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(sampleAudit),
    } as any);
    const auditsRes = await service.getAudit('232332');
    expect(auditsRes).toEqual(sampleAudit);
  });

  it('should return all audits when getAudits is called', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([sampleAudit]),
    } as any);
    const auditsRes = await service.getAudits();
    expect(auditsRes).toEqual([sampleAudit]);
  });


  it('should return all audits when editAudit is called', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce('success'),
    } as any);
    const auditsRes = await service.editAudit('33332', sampleAudit);
    expect(auditsRes).not.toBeNull;
  });

  it('should return all audits when deleteAudit is called', async () => {
    jest.spyOn(model, 'findByIdAndRemove').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce('success'),
    } as any);
    const auditsRes = await service.deleteAudit('33332');
    expect(auditsRes).not.toBeNull;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});