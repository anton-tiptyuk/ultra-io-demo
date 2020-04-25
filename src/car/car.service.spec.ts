import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Car, CarToOwner } from '../db/models';
import { CarService } from './car.service';

const carRepoMock = {
  // Base TypeOrmCrudService<> constructor pacifier
  metadata: { connection: { options: { type: 'anyDbType' } } },
  findOneOrFail: () => undefined,
  update: () => undefined,
};

const carToOwnerRepoMock = {
  delete: () => undefined,
};

const spies = {
  carRepo: {
    findOneOrFail: jest.spyOn(carRepoMock, 'findOneOrFail'),
    update: jest.spyOn(carRepoMock, 'update'),
  },
  carToOwnerRepo: {
    delete: jest.spyOn(carToOwnerRepoMock, 'delete'),
  },
};

let service: CarService;

describe('CarService', () => {
  beforeAll(async () => {
    const blankHandler = () => undefined;
    // Base TypeOrmCrudService<> constructor pacifier
    (TypeOrmCrudService.prototype as any).onInitMapEntityColumns = blankHandler;
    (TypeOrmCrudService.prototype as any).onInitMapRelations = blankHandler;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarService,
        {
          provide: getRepositoryToken(Car),
          useValue: carRepoMock,
        },
        {
          provide: getRepositoryToken(CarToOwner),
          useValue: carToOwnerRepoMock,
        },
      ],
    }).compile();

    service = module.get(CarService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should disable pagination', () => {
    expect(service.decidePagination()).toBe(false);
  });

  it('should look for manufacturer', async () => {
    const manufacturerId = '9357099e-1c1a-4ff0-8adc-084bf89daf94';
    const manufacturer = {
      id: manufacturerId,
      anyField: 'value'
    };

    spies.carRepo.findOneOrFail.mockImplementation(
      async () => ({ manufacturer })
    );

    await expect(service.getManufacturer(manufacturerId)).resolves.toEqual(manufacturer);
    expect(spies.carRepo.findOneOrFail)
      .toHaveBeenCalledWith(manufacturerId, { relations: ['manufacturer'] });
  });

  it('should perform aging', async () => {
    spies.carRepo.update.mockImplementation(async () => 'update result');
    spies.carToOwnerRepo.delete.mockImplementation(async () => 'delete result');

    await expect(service.performAging()).resolves.toMatchSnapshot();

    const updateCalls = spies.carRepo.update.mock.calls;
    expect(updateCalls.length).toBe(1);
    expect(updateCalls[0].length).toBe(2);
    expect((updateCalls as any)[0][1]['price']()).toBe('price * 0.8');

    expect(spies.carToOwnerRepo.delete.mock.calls.length).toBe(1);
    expect(spies.carToOwnerRepo.delete.mock.calls[0].length).toBe(1);
  });

});
