import Product, { GetProduct, ProductUpdate } from '../models/Product'
import BaseDatabase from './BaseDatabase'

export default class ProductsDatabase extends BaseDatabase {
  tableName = 'products'

  async create(product: GetProduct) {
    try {
      await this.connection.insert(product).into(this.tableName)
    } catch (error: any) {
      throw new Error(error.message || error.sqlMessage)
    }
  }

  async getByStore(input: string) {
    try {
      const result = await this.connection(this.tableName)
        .select()
        .where({ store_id: input })

      const products = result.map((product) =>
        Product.toProduct(product).getProduct(),
      )

      return products
    } catch (error: any) {
      throw new Error(error.message || error.sqlMessage)
    }
  }

  async getById(input: string): Promise<Product> {
    try {
      const result = await this.connection(this.tableName)
        .select()
        .where({ product_id: input })

      const productDB = result[0]
      const product = new Product(
        productDB.product_id,
        productDB.product_name,
        productDB.brand,
        productDB.store_id,
        productDB.head_id,
        productDB.quantity,
        productDB.price,
        productDB.created_at,
        productDB.updated_at,
      )
      return product
    } catch (error: any) {
      throw new Error(error.message || error.sqlMessage)
    }
  }

  async updateProduct(product: ProductUpdate, product_id: string) {
    try {
      await this.connection(this.tableName).update(product).where(product_id)
    } catch (error: any) {
      throw new Error(error.message || error.sqlMessage)
    }
  }

  delete = async (product_id: string) => {
    try {
      await this.connection(this.tableName).delete().where(product_id)
    } catch (error: any) {
      throw new Error(error.message || error.sqlMessage)
    }
  }
}
