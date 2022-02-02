import { STORE_ROLE } from "../../entities/Stores";


export default class StoreModel {
    constructor(
        private readonly store_id: string,
        private readonly head_id:string,
        private readonly store_name: string,
        private readonly email: string,
        private readonly password: string,
        private readonly CNPJ: number,
        private readonly adress: string,
        private readonly role: string,
        private readonly created_at: string,
        private readonly updated_at: string,
    ){}

    getStoreModel = () => {
        const store_id = this.store_id
        const head_id = this.head_id
        const store_name = this.store_name
        const email = this.email
        const password = this.password
        const CNPJ = this.CNPJ
        const adress = this.adress
        const role = this.role
        const created_at = this.created_at
        const updated_at = this.updated_at

        const storeModel = {
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
        }
        return storeModel
    }
}