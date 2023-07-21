import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cities - UpdateById', () => {

  it('Cities - UpdateById', async () => {
    const response = await testServer
      .post('/cities')
      .send({ name: 'they shall update by id' });

    expect(response.statusCode).toBe(StatusCodes.CREATED);

    const id = 1;
    const res1 = await testServer
      .put(`/cities/${id}`)
      .send({ name: 'they shall update by id' });

    expect(res1.statusCode).toBe(StatusCodes.OK);
  });

  it('Cities - UpdateById does not exist', async () => {

    const id = 99999;
    const res1 = await testServer
      .put(`/cities/${id}`)
      .send({ name: 'they shall update by id' });

    expect(res1.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });

});