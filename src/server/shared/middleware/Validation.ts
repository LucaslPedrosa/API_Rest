import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';


type TProperty = 'header' | 'body' | 'params' | 'query';
type TAllSchemas = Record<TProperty, yup.Schema<any>>;
type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler;

export const validation: TValidation = (schemas) => async (req, res, next) => {


  const errorsResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([field, schema]) => {
    try {
      schema.validateSync(req[field as TProperty], { abortEarly: false });
    } catch (error) {

      const yError = error as yup.ValidationError;
      const ValidationErrors: Record<string, string> = {};

      yError.inner.forEach((error) => {
        if (error.path === undefined) return;
        ValidationErrors[error.path] = error.message;
      });

      errorsResult[field] = ValidationErrors;

    }
  });

  if (Object.entries(errorsResult).length === 0) {
    return next();

  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
  }


};