import { body } from 'express-validator';

export const createMovementHistorySchema = [
    body('equipmentId')
        .exists()
        .withMessage('equipmentId is required')
        .isString()
        .withMessage('equipmentId must be a string'),
    body('movementType')
        .exists()
        .withMessage('movementType is required')
        .isString()
        .withMessage('movementType must be a string'),
    body('movementDate')
        .exists()
        .withMessage('movementDate is required')
        .isDate()
        .withMessage('movementDate must be a date'),
    body('movementFrom')
        .exists()
        .withMessage('movementFrom is required')
        .isString()
        .withMessage('movementFrom must be a string'),
    body('movementTo')
        .exists()
        .withMessage('movementTo is required')
        .isString()
        .withMessage('movementTo must be a string'),
    body('movementBy')
        .exists()
        .withMessage('movementBy is required')
        .isString()
        .withMessage('movementBy must be a string'),
    body('note')
        .optional()
        .isString()
        .withMessage('note must be a string'),
    ];

export const updateMovementHistorySchema = [
    body('equipmentId')
        .optional()
        .isString()
        .withMessage('equipmentId must be a string'),
    body('movementType')
        .optional()
        .isString()
        .withMessage('movementType must be a string'),
    body('movementDate')
        .optional()
        .isDate()
        .withMessage('movementDate must be a date'),
    body('movementFrom')
        .optional()
        .isString()
        .withMessage('movementFrom must be a string'),
    body('movementTo')
        .optional()
        .isString()
        .withMessage('movementTo must be a string'),
    body('movementBy')
        .optional()
        .isString()
        .withMessage('movementBy must be a string'),
    body('note')
        .optional()
        .isString()
        .withMessage('note must be a string'),
    ];