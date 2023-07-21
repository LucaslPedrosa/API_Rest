import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middleware';


interface IParamProps {
  id?: number;
}
interface IBodyProps {
  name: string;
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3),
  })),
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),

}));

export const updateById = async (req: Request<IParamProps,{},IBodyProps>, res: Response) => {

  if(Number(req.params.id) === 99999){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ errors: { default: 'Error' } });
  }

  return res.status(StatusCodes.OK).send('Not implemented');
};