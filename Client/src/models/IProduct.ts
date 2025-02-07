export interface IProduct
{
    id: number,
    name: string,
    description?: string,
    price?: number,
    isActive: Boolean,
    imageUrl?: string,
    stock?: number
}