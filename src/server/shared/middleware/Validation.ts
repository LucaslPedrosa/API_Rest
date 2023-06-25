import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';


type TProperty = 'header' | 'body' | 'params' | 'query';

type TGetSchema = <T>(schema : yup.Schema<T>) => yup.Schema<T>;

type TAllSchemas = Record<TProperty, yup.Schema<any>>;

type TGetAllSchemas = (schemas: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (schemas: TGetAllSchemas) => RequestHandler;


export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {

  const schemas = getAllSchemas((schema) => schema);

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