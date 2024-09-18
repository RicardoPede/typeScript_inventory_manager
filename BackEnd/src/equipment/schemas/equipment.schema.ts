import { body } from "express-validator";

export const createEquipmentSchema = [
    body('name').isString().withMessage('Name must be a string').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('description').isString().withMessage('Description is not valid'),
    body('serialNumber').isString().withMessage('Serial Number is not valid'),
    body('category').isString().withMessage('Category is not valid'),
    body('status').isString().withMessage('Status is not valid'),
    body('location').isString().withMessage('Location is not valid'),
    body('purchaseDate').isDate().withMessage('Purchase Date is not valid'),
    body('image').isString().withMessage('Image is not valid'),
    body('price').isNumeric().withMessage('Price is not valid'),
    body('stock').isNumeric().withMessage('Stock is not valid'),
];

export const updateEquipmentSchema = [
    body("name").exists().withMessage("Name is required"),
    body("description").exists().withMessage("Description is required"),
    body("serialNumber").exists().withMessage("Serial Number is required"),
    body("category").exists().withMessage("Category is required"),
    body("status").exists().withMessage("Status is required"),
    body("location").exists().withMessage("Location is required"),
    body("purchaseDate").exists().withMessage("Purchase Date is required"),
    body("image").exists().withMessage("Image is required"),
    body("price").exists().withMessage("Price is required"),
    body("stock").exists().withMessage("Stock is required"),
];
