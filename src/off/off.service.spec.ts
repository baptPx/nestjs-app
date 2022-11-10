import { Test, TestingModule } from '@nestjs/testing';
import { OffService } from './off.service';

describe('OffService', () => {
  let service: OffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OffService],
    }).compile();

    service = module.get<OffService>(OffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
