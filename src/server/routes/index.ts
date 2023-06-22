import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CitiesController } from './../controllers';


const router = Router();

const f = function(req : Request, res : Response) {
  return res.send('Ola mudos');
};

router.get('/', f);

router.post('/cities', CitiesController.createValidation, CitiesController.create);

export {router};