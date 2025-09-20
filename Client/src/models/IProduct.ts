export interface IProduct
{
    id: number,
    name: string,
    description?: string,
    price: number,
    isActive: Boolean,
    imageUrl?: string,
    stock?: number,
    categoryId?: number | null,
    category?: {
        id: number,
        name: string,
        description?: string,
        isActive: boolean
    }
}