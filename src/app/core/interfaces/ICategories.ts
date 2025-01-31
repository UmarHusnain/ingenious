export interface ICategory {
    categoryId: number
    name: string
    slug: string
    parentCategoryId: any
    imageUrl: string
    isActive: boolean
    createdAt: string
    updatedAt: string
    totalProducts: number
  }
  export interface IUpsertCategory {
    categoryId: number;
    name: string;
    slug: string;
    parentCategoryId: number | null;
    imageUrl: string;
    isActive: boolean;
}