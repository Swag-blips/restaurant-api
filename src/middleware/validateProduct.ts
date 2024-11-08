import { AnyObjectSchema, ValidationError } from "yup";
import { Request, Response, NextFunction } from "express";

const validateProduct =
  (schema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: true, strict: true });

      next();
    } catch (error) {
      const e = error as ValidationError;
      res.status(400).json({ error: e.message });
    }
  };

export default validateProduct;
