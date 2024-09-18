import { body } from 'express-validator';

export const createCategorySchema = [
  body('name')
    .exists()
    .withMessage('name is required')
    .isString()
    .withMessage('name must be a string'),
  body('description')
    .exists()
    .withMessage('description is required')
    .isString()
    .withMessage('description must be a string'),
];

export const updateCategorySchema = [
  body('name')
    .optional()
    .isString()
    .withMessage('name must be a string'),
  body('description')
    .optional()
    .isString()
    .withMessage('description must be a string'),
];