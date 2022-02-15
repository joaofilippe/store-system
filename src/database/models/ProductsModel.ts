export default class Products {
    private readonly product_id: string;
    private readonly product_name: string;
    private readonly brand: string;
    private readonly store_id: string;
    private readonly head_id: string;
    private readonly quantity: string;
    private readonly price: number;
    private readonly created_at: string;
    private readonly updated_at: string;
    constructor(
        product_id: string,
        product_name: string,
        brand: string,
        store_id: string,
        head_id: string,
        quantity: string,
        price: number,
        created_at: string,
        updated_at: string
    ) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.brand = brand;
        this.store_id = store_id;
        this.head_id = head_id;
        this.price = price;
        this.quantity = quantity;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    getProductModel() : ProductModel {
        const product_id = this.product_id;
        const product_name = this.product_name;
        const brand = this.brand;
        const store_id = this.store_id;
        const head_id = this.head_id;
        const quantity = this.quantity;
        const price = this.price;
        const created_at = this.created_at;
        const updated_at = this.updated_at;

        const productModel : ProductModel = {
            product_id,
            product_name,
            brand,
            store_id,
            head_id,
            quantity,
            price,
            created_at,
            updated_at,
        };

        return productModel;
    }
}

export interface ProductModel {
    product_id: string;
    product_name: string;
    brand: string;
    store_id: string;
    head_id: string;
    quantity: string;
    price: number;
    created_at: string;
    updated_at: string;
}
