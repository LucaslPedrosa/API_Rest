import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CitiesController } from './../controllers';


const router = Router();

const f = function(req : Request, res : Response) {
  return res.send('Ola mudos');
};

router.get('/', f);

router.get('/cities', CitiesController.getAllValidation, CitiesController.getAll);
router.post('/cities', CitiesController.createValidation, CitiesController.create);
router.get('/cities/:id', CitiesController.getByIdValidation, CitiesController.getById);
router.put('/cities/:id', CitiesController.updateByIdValidation, CitiesController.updateById);
router.delete('/cities/:id', CitiesController.deleteByIdValidation, CitiesController.deleteById);

export {router};