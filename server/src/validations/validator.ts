import { check } from "express-validator";

export const validations = [
    check("quantidade").isInt({ min: 1 }).withMessage("quantidade deve ser pelo menos 1"),
    check("valor").isInt({ min: 1 }).withMessage("valor deve ser pelo menos 1")
];

