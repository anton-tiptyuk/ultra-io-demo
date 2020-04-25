import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Owner } from '../db/models';
import { CarService } from '../car/car.service';

import { BusinessService } from './business.service';

const carServiceFake = { performAging: () => undefined };
const ownerRepoWhereFake = { where: () => undefined };
let service: BusinessService;

describe('BusinessService', () => {

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessService,
        {
          provide: CarService,
          useValue: carServiceFake,
        },
        {
          provide: getRepositoryToken(Owner),
          useValue: {
            createQueryBuilder: () => ({
              delete: () => ownerRepoWhereFake
            })
          },
        },
      ],
    }).compile();

    service = module.get(BusinessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should perform aging', async () => {
    const whereSpy = jest.spyOn(ownerRepoWhereFake, 'where');
    whereSpy.mockImplementation(() => ({ execute: async () => ({ affected: 13 }) }));

    const performAgingSpy = jest.spyOn(carServiceFake, 'performAging');
    performAgingSpy.mockImplementation(async () => [{ affected: 8 }, { affected: 2 }]);

    await expect(service.performAging()).resolves.toMatchSnapshot();

    expect(whereSpy).toHaveBeenCalled();
    expect(whereSpy.mock.calls).toMatchSnapshot();

    expect(performAgingSpy).toHaveBeenCalled();
  });

});
