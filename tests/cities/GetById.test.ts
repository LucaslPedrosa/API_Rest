import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cities - GetById', () => {


  //Start of CITIES getById tests
  // Create a test to validate the city delete by id
  it('Cities - getById', async () => {

    const response = await testServer
      .post('/cities')
      .send({ name: 'they shall get by id' });

    expect(response.statusCode).toBe(StatusCodes.CREATED);

    const id = 1;
    const res1 = await testServer
      .get(`/cities/${id}`);

    expect(res1.statusCode).toBe(StatusCodes.OK);
    expect(res1.body).toHaveProperty('name');
  });

  it('Cities - getById does not exist', async () => {
    const id = 99999;
    const res1 = await testServer
      .get(`/cities/${id}`);

    expect(res1.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });

  //end of CITIES getById tests
});