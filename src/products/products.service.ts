import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/product.createDto';
import { Product } from './interfaces/product.interface';
import * as mongoose from 'mongoose';
import errors from '../../utils/errors';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(createProductDto: CreateProductDto): Promise<any> {
    try {
      const newProduct = new this.productModel(createProductDto);
      return await this.productModel.create(newProduct);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getProducts(): Promise<Product[]> {
    return this.productModel.find();
  }
  async getProduct(id: string): Promise<Product> {
    if (!this.isIdValid(id))
      throw new BadRequestException(errors.PRODUCT_ID_NOT_VALID);

    let result = await this.productModel.findOne({ _id: id });
    if (!result) throw new NotFoundException(errors.PRODUCT_NOT_FOUND);
    return result;
  }
  async updateProduct(id: string, product: Product): Promise<any> {
    if (!this.isIdValid(id))
      throw new BadRequestException(errors.PRODUCT_ID_NOT_VALID);

    let prod = await this.productModel.findByIdAndUpdate(id, product);

    if (!prod) throw new NotFoundException(errors.PRODUCT_NOT_FOUND);

    return prod;
  }

  async deleteProduct(id: string): Promise<any> {
    if (!this.isIdValid(id))
      throw new BadRequestException(errors.PRODUCT_ID_NOT_VALID);

    let result = await this.productModel.findByIdAndRemove(id);

    if (!result) throw new NotFoundException(errors.PRODUCT_NOT_FOUND);

    return result;
  }
  async deleteAllProducts(): Promise<Boolean> {
    let result = await this.productModel.deleteMany();
    return true;
  }

  isIdValid(id: string): Boolean {
    return mongoose.Types.ObjectId.isValid(id);
  }
}
