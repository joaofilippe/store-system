import Products, { Product } from '../entities/Products';
import BaseDatabase from './BaseDatabase';
import ProductsModel, {
    ProductModel,
    ProductUpdate,
} from './models/ProductsModel';

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
            await this.connection.insert(product).into(this.tableName);
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
                .where({ store_id: input });

            const products = result.map((product) =>
                ProductsModel.toProducts(product).getProduct()
            );

            return products;

        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }

    async getById(input: string): Promise<Products> {
        try {
            const result = await this.connection(this.tableName)
                .select()
                .where({ product_id: input });

            const productDB: ProductModel = result[0];
            const product = new Products(
                productDB.product_id,
                productDB.product_name,
                productDB.brand,
                productDB.store_id,
                productDB.head_id,
                productDB.quantity,
                productDB.price,
                productDB.created_at,
                productDB.updated_at
            );
            console.log('product: ', product)
            return product;
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }
}
