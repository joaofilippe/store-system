import moment from 'moment';
import HashManager from '../services/HashManager';
import IdManager from '../services/IdManager';
import Authenticator from '../services/Authenticator';
import Products, { ProductInputDTO } from '../entities/Products';
import ProductsDatabase from '../database/ProductsDatabase';

export default class ProductsBussiness {
    hashManager: HashManager;
    idManager: IdManager;
    authenticator: Authenticator;
    constructor() {
        this.hashManager = new HashManager();
        this.idManager = new IdManager();
        this.authenticator = new Authenticator();
    }

    async create(input: ProductInputDTO, database: ProductsDatabase) {
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
    }
}
