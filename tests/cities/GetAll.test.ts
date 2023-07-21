import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cities - GetAll', () => {

  //start of CITIES - GET ALL
  // Create a test to validate the city delete by id
  it('Cities - get all Registers', async () => {

    const response = await testServer
      .post('/cities')
      .send({ name: 'they shall get all' });

    expect(response.statusCode).toBe(StatusCodes.CREATED);

    const res1 = await testServer
      .get('/cities')
      .query({ page: 1, limit: 10, number: '1' });

    expect(Number(res1.header['x-total-count'])).toBeGreaterThan(0);
    expect(res1.statusCode).toBe(StatusCodes.OK);
    expect(res1.body.length).toBeGreaterThan(0);
  });

  it('Cities - page Bad request - number', async () => {
    const res1 = await testServer
      .get('/cities')
      .query({ page: '1234testing' });

    expect(res1.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.query.page');
  });

  it('Cities - page Bad request - !greater than 0', async () => {
    const res1 = await testServer
      .get('/cities')
      .query({ page: -1 });

    expect(res1.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.query.page');
  });

  it('Cities - Limit bad request - number', async () => {
    const res1 = await testServer
      .get('/cities')
      .query({ page: 1, limit: '123testing' });

    expect(res1.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.query.limit');
  });

  it('Cities - Limit bad request - !greater than 0', async () => {
    const res1 = await testServer
      .get('/cities')
      .query({ page: 1, limit: -1 });

    expect(res1.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.query.limit');
  });
  //END OF CITIES - GET ALL


});