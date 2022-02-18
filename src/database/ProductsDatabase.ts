import { Product } from '../entities/Products';
import BaseDatabase from './BaseDatabase';
import ProductsModel, { ProductUpdate } from './models/ProductsModel';

export default class ProductsDatabase extends BaseDatabase {
    tableName = 'products';

    async create(input: Product) {
        try {
            const productModel = new ProductsModel(
                input.productId,
                input.productName,
                input.brand,
                input.storeId,
                input.headId,
                input.quantity,
                input.price,
                input.createdAt,
                input.updatedAt
            );

            const product = productModel.getProductModel();

            await this.connection(this.tableName).insert(product);
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }
    async update(input: any) {
        try {
            const productUpdate: ProductUpdate = {
                product_name: input.productName,
                brand: input.brand,
                quantity: input.quantity,
                price: input.price,
                updated_at: input.updaetedAt,
            };

            await this.connection(this.tableName).insert(productUpdate);
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }

    async getByStore(input: string) {
        try {
            const result = await this.connection(this.tableName)
                .select()
                .where({ storeId: input });

            const products = result.map((product) =>
                ProductsModel.toProducts(product)
            );

            return products

        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }

    
    async getById(input: string) {
        try {
            const result = await this.connection(this.tableName)
                .select()
                .where({ id: input });

            const products = result.map((product) =>
                ProductsModel.toProducts(product)
            );

            return products

        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }
}
