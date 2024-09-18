export interface ICategory {
  _id?: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategoryService {
  getAllCategories(): Promise<ICategory[]>;
  getCategoryById(id: string): Promise<ICategory>;
  createCategory(category: ICategory): Promise<ICategory>;
  updateCategory(id: string, category: ICategory): Promise<ICategory>;
  deleteCategory(id: string): Promise<void>;
}