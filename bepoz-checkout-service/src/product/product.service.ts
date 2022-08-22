import { Injectable, Logger } from '@nestjs/common';
import { ProductList } from './data/product.data';
import { Product } from './dto/product.dto';

@Injectable()
export class ProductService {
  private readonly _logger = new Logger(ProductService.name);

  async getAllProducts(): Promise<Product[]> {
    this._logger.log('getAllProducts method executing');
    return ProductList;
  }

  async getProductById(pid: number): Promise<Product> {
    this._logger.log(`getProductById method executing with data-${pid}`);
    return ProductList.filter((product) => product.pid === pid)[0];
  }
}
