import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import * as supertest from 'supertest';

import { Car } from '../db/models';
import { CarController } from './car.controller';
import { CarService } from './car.service';

const carServiceMock = {
  getManufacturer: () => undefined,
  createOne: () => undefined,
  getOne: () => undefined,
};

const spies = {
  carService: {
    getManufacturer: jest.spyOn(carServiceMock, 'getManufacturer'),
    createOne: jest.spyOn(carServiceMock, 'createOne'),
    getOne: jest.spyOn(carServiceMock, 'getOne'),
  },
};

let app: INestApplication;
const request = () => supertest(app.getHttpServer());

describe('Car Controller', () => {
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: CarService,
          useValue: carServiceMock,
        }
      ],
      controllers: [CarController],
    }).compile();

    app = await module.createNestApplication().init();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(app.get(CarController)).toBeDefined();
  });

  it('should fetch manufacturer', async () => {
    const resultMock = { value: 'anything' };
    spies.carService.getManufacturer.mockImplementation(async () => resultMock);
    const { body } = await request().get('/car/random-id-value/manufacturer');
    expect(body).toEqual(resultMock);
    expect(spies.carService.getManufacturer).toHaveBeenCalledWith('random-id-value');
  });

  describe('checks for CRUD POST /car', () => {
    const createOneResult = { dummy: 'result' };

    const subject = (data: Object) => request().post('/car').send(data);

    beforeEach(() => {
      spies.carService.createOne.mockImplementation(async () => createOneResult);
    });

    it('should consume valid request', async () => {
      const requestData = {
        id: '7a570935-3b36-48a2-8889-48ca8810be11',
        manufacturer: {
          id: 'put manufacturer id here'
        },
        price: 100500,
        firstRegistrationDate: '2018-08-16T12:47:15.000Z',
      };

      const { body } = await subject(requestData).expect(201);

      expect(body).toEqual(createOneResult);
      expect(spies.carService.createOne).toHaveBeenCalled();
      expect((spies.carService.createOne.mock.calls as any)[0][1]).toEqual(requestData);
    });

    it('should reject invalid request (no manufacturer)', async () => {
      const { body } = await subject({
        id: '7a570935-3b36-48a2-8889-48ca8810be11',
        price: 100500,
        firstRegistrationDate: '2018-08-16T12:47:15.000Z',
      })
        .expect(400);
      expect(body).toMatchSnapshot();
    });

    it('should reject invalid request (bad price - string)', async () => {
      const { body } = await subject({
        id: '7a570935-3b36-48a2-8889-48ca8810be11',
        manufacturer: {
          id: 'put manufacturer id here'
        },
        price: '100500',
        firstRegistrationDate: '2018-08-16T12:47:15.000Z',
      })
        .expect(400);
      expect(body).toMatchSnapshot();
    });
  });

  it('should fetch car', async () => {
    spies.carService.getOne.mockImplementation(async () => {
      const result = new Car();
      result.price = 100;
      result.id = 'none';
      return result;
    });
    const { body } = await request().get('/car/random-id-value').expect(200);
    expect(body).toMatchSnapshot();
    expect(spies.carService.getOne.mock.calls[0]).toMatchSnapshot();
  });

});
