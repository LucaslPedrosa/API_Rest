import * as create from './Create';
import * as getAll from './GetAll';
import * as deleteById from './DeleteById';
import * as updateById from './UpdateById';
import * as getById from './GetByID';



export const CitiesController = {
  ...create,
  ...getAll,
  ...deleteById,
  ...updateById,
  ...getById,
};