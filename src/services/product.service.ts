import { Product } from '../models/product';
import { CreateProductDTO, UpdateProductDTO } from '../utils/interface/product.interface';

export class ProductService {
  async createProduct(data: CreateProductDTO, ownerId: string) {
    const product = new Product({ ...data, owner: ownerId });
    await product.save();
    return product;
  }

  async getProductById(id: string) {
    return Product.findById(id).populate('owner');
  }

  async updateProduct(id: string, data: UpdateProductDTO) {
    return Product.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProduct(id: string) {
    return Product.findByIdAndDelete(id);
  }
}
