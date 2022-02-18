import moment from 'moment';
import HashManager from '../services/HashManager';
import IdManager from '../services/IdManager';
import Authenticator from '../services/Authenticator';
import Products, {
    GetProductsByIdDTO,
    GetProductsByStoreDTO,
    ProductInputDTO,
} from '../entities/Products';
import ProductsDatabase from '../database/ProductsDatabase';

export default class ProductsBussiness {
    hashManager: HashManager;
    idManager: IdManager;
    authenticator: Authenticator;
    database: ProductsDatabase;
    constructor(database: ProductsDatabase) {
        this.hashManager = new HashManager();
        this.idManager = new IdManager();
        this.authenticator = new Authenticator();
        this.database = database;
    }

    async create(input: ProductInputDTO) {
        try {
            const { productName, brand, quantity, price, token } = input;

            if (!token) {
                throw new Error(
                    `Você precisa estar logado para cadastrar um produto.`
                );
            }

            const productId = this.idManager.generateId();
            const tokenData = this.authenticator.getTokenData(token);
            const storeId = tokenData.storeId;
            const headId = tokenData.headId;
            const createdAt = moment().format('YYYY-MM-DD hh:mm:ss');
            const updatedAt = createdAt;

            const product = new Products(
                productId,
                productName,
                brand,
                storeId,
                headId,
                quantity,
                price,
                createdAt,
                updatedAt
            );

            const produtcInput = product.getProduct();

            return productId;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getByStore(input: GetProductsByStoreDTO) {
        try {
            const { token, storeId } = input;

            if (!token) {
                throw new Error(
                    'Você deve estar logado para requisitar essas informações.'
                );
            }

            const tokenData = await this.authenticator.getTokenData(token);
            const tokenStoreId = tokenData.storeId;
            const tokenHeadId = tokenData.headId;
            const tokenRole = tokenData.role;

            const result = await this.database.getByStore(storeId);

            if (!result) {
                throw new Error(
                    'A loja informada não consta em nosso banco de dados.'
                );
            }

            return result;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }


    async getById(input: GetProductsByIdDTO) {
        try {
            const { token, productId } = input;

            if (!token) {
                throw new Error(
                    'Você deve estar logado para requisitar essas informações.'
                );
            }

            const tokenData = await this.authenticator.getTokenData(token);
            const tokenStoreId = tokenData.storeId;
            const tokenHeadId = tokenData.headId;
            const tokenRole = tokenData.role;

            const result = await this.database.getById(productId);

            if (!result) {
                throw new Error(
                    'O produto informado não consta em nosso banco de dados.'
                );
            }

            return result;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}