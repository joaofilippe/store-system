export default class Product {
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

  getProduct(): GetProduct {
    const productId = this.productId;
    const productName = this.productName;
    const brand = this.brand;
    const storeId = this.storeId;
    const headId = this.headId;
    const quantity = this.quantity;
    const price = this.price;
    const createdAt = this.createdAt;
    const updatedAt = this.updatedAt;

    const product: GetProduct = {
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

  getProductModel(): ProductModel {
    const product_id = this.productId;
    const product_name = this.productName;
    const brand = this.brand;
    const store_id = this.storeId;
    const head_id = this.headId;
    const quantity = this.quantity;
    const price = this.price;
    const created_at = this.createdAt;
    const updated_at = this.updatedAt;

    const productModel: ProductModel = {
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

  static toProduct(data: any): Product {
    const product: Product = new Product(
      data.product_id,
      data.product_name,
      data.brand,
      data.store_id,
      data.head_id,
      data.quantity,
      data.price,
      data.created_at,
      data.updated_at
    );

    return product
  }
}

export interface GetProduct {
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

export interface GetProductsByStoreDTO {
  token: string;
  storeId: string;
}

export interface GetProductsByIdDTO {
  token: string;
  productId: string;
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

export interface ProductUpdateDTO {
  productId: string;
  productName?: string;
  brand?: string;
  quantity?: string;
  price?: number;
  token: string;
}

export interface ProductUpdate {
  product_name?: string;
  brand?: string;
  quantity?: string;
  price?: number;
  updated_at: string;
}
