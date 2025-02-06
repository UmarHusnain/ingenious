export interface ICategory {
    categoryId: number;
    name: string;
    slug: string;
    parentCategoryId: number | null;
    imageUrl: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }

export interface IEditCategory {
    categoryId: number;
    name: string;
    slug: string;
    parentCategoryId: number | null;
    imageUrl: string;
    isActive: boolean;
  }