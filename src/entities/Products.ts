export default class Products {
    private readonly productId: string;
    private readonly productName: string;
    private readonly brand: string;
    private readonly storeId: string;
    private readonly headId: string;
    private readonly quantity: string;
    private readonly price: number;
    private readonly createdAt: string;
    private readonly updatedAt: string;
    constructor(
        productId: string,
        productName: string,
        brand: string,
        storeId: string,
        headId: string,
        quantity: string,
        price: number,
        createdAt: string,
        updatedAt: string
    ) {
        this.productId = productId;
        this.productName = productName;
        this.brand = brand;
        this.storeId = storeId;
        this.headId = headId;
        this.price = price;
        this.quantity = quantity;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    getProduct(): Product {
        const productId = this.productId;
        const productName = this.productName;
        const brand = this.brand;
        const storeId = this.storeId;
        const headId = this.headId;
        const quantity = this.quantity;
        const price = this.price;
        const createdAt = this.createdAt;
        const updatedAt = this.updatedAt;

        const product: Product = {
            productId,
            productName,
            brand,
            storeId,
            headId,
            quantity,
            price,
            createdAt,
            updatedAt,
        };

        return product;
    }
}

export interface Product {
    productId: string;
    productName: string;
    brand: string;
    storeId: string;
    headId: string;
    quantity: string;
    price: number;
    createdAt: string;
    updatedAt: string;
}

export interface ProductInputDTO {
    productName: string;
    brand: string;
    quantity: string;
    price: number;
    token: string;
}

export interface GetProductsByStoreDTO{
    token: string;
    storeId: string;
}

export interface GetProductsByIdDTO{
    token: string;
    productId: string;
}