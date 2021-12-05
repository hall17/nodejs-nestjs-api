import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/product.createDto';
import { Product } from './interfaces/product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<any> {
    return await this.productsService.insertProduct(createProductDto);
  }

  @Get()
  getProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: string): Promise<any> {
    return this.productsService.getProduct(id);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ): Promise<any> {
    return await this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<any> {
    return await this.productsService.deleteProduct(id);
  }
  
  @Delete('/delete/all')
  async deleteAllProducts(): Promise<Boolean> {
    return await this.productsService.deleteAllProducts();
  }
}
