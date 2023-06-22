import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';


interface ICity {
  name: string;
  state: string;
}

interface IFilter {
  name: string;
  state: string;
}

export const createValidation = validation({
  body: yup.object().shape({
    name: yup.string().required().min(3),
    state: yup.string().required().min(3),
  }),

  query: yup.object().shape({
    name: yup.string().required().min(3),
  })

}); 

// eslint-disable-next-line @typescript-eslint/ban-types
export const create = async  (req : Request<{},{},ICity>, res: Response) => {
  
  console.log(req.body);

  return res.status(StatusCodes.ACCEPTED).send('Create!');
};