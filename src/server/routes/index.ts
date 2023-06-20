import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();



router.get('/', (req, res) => {
  return res.send('Ola mudos');
});

router.post('/test', (req, res) => {
  console.log(req.cookies);  
  res.status(StatusCodes.UNAUTHORIZED).send('ola mudos');
  return 0;
});

export {router};