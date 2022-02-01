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
    constructor(
        private readonly storeId: string,
        private readonly storeName: string,
        private readonly headId: string,
        private readonly email: string,
        private readonly password: string,
        private readonly CNPJ: number,
        private readonly adress: string,
        private readonly role: STORE_ROLE,
        private readonly createdAt: string,
        private readonly updatedAt: string
    ) {
        this.role = 'head' ? STORE_ROLE.HEAD : STORE_ROLE.SUB;
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

        const store = {
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
        } : StoresDB = input;

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

        return store;
    };
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
    roleInput: string;
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

export interface LoginDTO {
    email: string;
    password: string;
}
