export enum STORE_ROLE {
    HEAD = 'head',
    SUB = 'sub',
}

export interface AuthenticationData {
    storeId: string;
    headId: string;
    role: STORE_ROLE;
}

export default class Stores {
    private readonly storeId: string;
    private readonly storeName: string;
    private readonly headId: string;
    private readonly email: string;
    private readonly password: string;
    private readonly CNPJ: number;
    private readonly adress: string;
    private readonly role: STORE_ROLE;
    private readonly createdAt: string;
    private readonly updatedAt: string;
    constructor(
        storeId: string,
        storeName: string,
        headId: string,
        email: string,
        password: string,
        CNPJ: number,
        adress: string,
        role: STORE_ROLE | string,
        createdAt: string,
        updatedAt: string
    ) {
       this.storeId = storeId
       this.storeName = storeName
       this.headId = headId
       this.email = email
       this.password = password
       this.CNPJ = CNPJ
       this. adress = adress
       this.createdAt = createdAt
       this.updatedAt = updatedAt     
       
        if (role === 'head') {
            this.role = STORE_ROLE.HEAD;
        } else if (role === 'sub') {
            this.role = STORE_ROLE.SUB;
        } else {
            throw new Error(
                'Você deve informar os parâmetros "head" ou "sub".'
            );
        }
    }

    getStore = () => {
        const storeId = this.storeId;
        const storeName = this.storeName;
        const headId = this.headId;
        const email = this.email;
        const password = this.password;
        const CNPJ = this.CNPJ;
        const adress = this.adress;
        const role = this.role;
        const createdAt = this.createdAt;
        const updatedAt = this.updatedAt;

        const store: StoresReturn = {
            storeId,
            storeName,
            headId,
            email,
            password,
            CNPJ,
            adress,
            role,
            createdAt,
            updatedAt,
        };

        return store;
    };

    static toStores = (input: StoresDB): Stores => {
        const {
            store_id,
            store_name,
            head_id,
            email,
            password,
            CNPJ,
            adress,
            role,
            created_at,
            updated_at,
        }: StoresDB = input;

        const store = new Stores(
            store_id,
            store_name,
            head_id,
            email,
            password,
            CNPJ,
            adress,
            role,
            created_at,
            updated_at
        );
        console.log({ store: store });
        return store;
    };
}

export interface StoresReturn {
    storeId: string;
    storeName: string;
    headId: string;
    email: string;
    password: string;
    CNPJ: number;
    adress: string;
    role: STORE_ROLE;
    createdAt: string;
    updatedAt: string;
}
export interface StoresDB {
    store_id: string;
    store_name: string;
    head_id: string;
    email: string;
    password: string;
    CNPJ: number;
    adress: string;
    role: STORE_ROLE;
    created_at: string;
    updated_at: string;
}
export interface SignupDTO {
    storeName: string;
    email: string;
    password: string;
    CNPJ: number;
    adress: string;
}

export interface SignupInput {
    storeId: string;
    storeName: string;
    headId: string;
    email: string;
    password: string;
    CNPJ: number;
    adress: string;
    role: STORE_ROLE;
    createdAt: string;
    updatedAt: string;
}
export interface CreateDTO {
    token: string;
    storeName: string;
    email: string;
    password: string;
    CNPJ: number;
    adress: string;
}

export interface CreateInput {
    storeId: string;
    storeName: string;
    headId: string;
    email: string;
    password: string;
    CNPJ: number;
    adress: string;
    role: STORE_ROLE;
    createdAt: string;
    updatedAt: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface EnrollSubDTO {
    token: string;
    storeName: string;
    email: string;
    password: string;
    CNPJ: number;
    adress: string;
}

export interface GetStoreByIdDTO {
    token: string;
    storeId: string;
}
export interface GetStoreByEmailDTO {
    token: string;
    email: string;
}
