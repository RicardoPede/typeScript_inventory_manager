import { body } from "express-validator";

export const createUserSchema = [
    body('name').isString().withMessage('Name must be a string').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('username').isString().withMessage('Username is not valid'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('dni').isString().withMessage('DNI is not valid'),
    body('phone').isString().withMessage('Phone is not valid'),
    body('address').isString().withMessage('Address is not valid'),
    body('city').isString().withMessage('City is not valid'),
];

export const updateUserSchema = [
    body("name").exists().withMessage("Name is required"),
    body("username").exists().withMessage("Username is required"),
];

export const changePasswordSchema = [
    body("oldPassword").exists().withMessage("Old password is required"),
    body("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters"),
];

export const changeRoleSchema = [
    body("role").exists().withMessage("Role is required"),
];