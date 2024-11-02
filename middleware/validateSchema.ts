import { NextFunction, Request, Response } from "express";
import { AnyObjectSchema, ValidationError } from "yup";

const validate =
  (schema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      await schema.validate(req.body, { abortEarly: true, strict: true });

      next();
    } catch (e) {
      const error = e as ValidationError;
      res.status(400).send(error.message);
    }
  };

export default validate;
