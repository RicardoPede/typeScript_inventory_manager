import { Category } from "../category/entities/category";
import { ICategory, ICategoryService } from "./interface/category.interface";

export class CategoryService implements ICategoryService {
    async getAllCategories(): Promise<ICategory[]> {
        return await Category.find();
    }
    
    async getCategoryById(id: string): Promise<ICategory> {
        const category = await Category.findById(id);
        if (!category) {
            throw new Error(`Category with id ${id} not found`);
        }
        return category.toObject() as unknown as ICategory;
    }
    
    async createCategory(category: ICategory): Promise<ICategory> {
        const newCategory = {
            ...category,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const createdCategory = await Category.create(newCategory);
        return createdCategory.toObject() as unknown as ICategory;
    }
    
    async updateCategory(id: string, category: ICategory): Promise<ICategory> {
        const updatedCategory = await Category.findByIdAndUpdate(category._id, category, { new: true });
        if (!updatedCategory) {
            throw new Error(`Category with id ${category._id} not found`);
        }
        return updatedCategory.toObject() as unknown as ICategory;
    }
    
    async deleteCategory(id: string): Promise<void> {
        await Category.findByIdAndDelete(id);
    }
    }