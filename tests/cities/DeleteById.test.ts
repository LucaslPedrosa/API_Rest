import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cities - DeleteById', () => {

  // Create a test to validate the city delete by id
  it('delete a register', async () => {

    const response = await testServer
      .post('/cities')
      .send({name : 'i will be deleted'});

    expect (response.statusCode).toBe(StatusCodes.CREATED);

    const id = response.body;

    const res1 = await testServer
      .delete(`/cities/${id}`);

    expect(res1.statusCode).toBe(StatusCodes.NO_CONTENT);
  });

  it('delete a register that does not exist', async () => {
    const id = 99999;

    const res1 = await testServer
      .delete(`/cities/${id}`);

    expect(res1.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });

});