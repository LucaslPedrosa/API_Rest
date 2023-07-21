import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cities - create', () => {

  // Create a test to validate city creation
  it('should create a city', async () => {

    const res1 = await testServer
      .post('/cities')
      .send({ name: 'Test City' });

    expect(res1.statusCode).toBe(201);
    expect(typeof res1.body).toBe('number');
  });


  // Create a test to validate the name field
  it('create a register with name too short', async () => {
    const res1 = await testServer
      .post('/cities')
      .send({ name: 'aa' });

    expect(res1.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.name');
  });

  // Create a test to validate the name field
  it('create a city without name', async () => {
    const res1 = await testServer
      .post('/cities')
      .send({});

    expect(res1.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.name');
  });

});