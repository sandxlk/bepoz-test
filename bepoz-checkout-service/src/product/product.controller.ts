import { Controller, Get, Logger } from '@nestjs/common';
import { Product } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  private readonly _logger = new Logger(ProductController.name);

  constructor(private _productService: ProductService) {}

  @Get()
  async getAllProduct(): Promise<Product[]> {
    this._logger.log('getAllProduct method executing');
    return this._productService.getAllProducts();
  }
}
