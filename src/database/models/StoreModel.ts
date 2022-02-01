import { STORE_ROLE } from "../../entities/Stores";


export default class StoreModel {
    constructor(
        private readonly store_id: string,
        private readonly head_id:string,
        private readonly email: string,
        private readonly password: string,
        private readonly CNPJ: number,
        private readonly adress: string,
        private readonly role: string,
        private readonly created_at: string,
        private readonly updated_at: string,
    ){
        this.role = STORE_ROLE.HEAD ? 'head': 'sub'
    }

    getStoreModel = () => {
        const store_id = this.store_id
        const head_id = this.head_id
        const email = this.email
        const password = this.password
        const CNPJ = this.CNPJ
        const adress = this.adress
        const role = this.role
        const created_at = this.created_at
        const updated_at = this.updated_at

        const storeModel = {
            store_id,
            head_id,
            email,
            password,
            CNPJ,
            adress,
            role,
            created_at,
            updated_at
        }
        return storeModel
    }
}