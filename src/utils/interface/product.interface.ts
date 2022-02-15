export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
}
