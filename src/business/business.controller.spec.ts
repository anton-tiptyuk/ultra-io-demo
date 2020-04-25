import { Test, TestingModule } from '@nestjs/testing';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';

let controller: BusinessController;

const serviceFake = { performAging: () => undefined };
const performAgingSpy = jest.spyOn(serviceFake, 'performAging');

describe('Business Controller', () => {
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: BusinessService,
        useValue: serviceFake,
      }],
      controllers: [BusinessController],
    }).compile();

    controller = module.get<BusinessController>(BusinessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should trigger car and owner aging', async () => {
    performAgingSpy.mockImplementation(async () => 'any kind of result service returns');
    await expect(controller.triggerAging()).resolves.toMatchSnapshot();
  });
});
