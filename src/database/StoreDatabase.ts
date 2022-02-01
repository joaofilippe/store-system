import Stores from '../entities/Stores';
import { SignupInput } from '../entities/Stores';
import BaseDatabase from './BaseDatabase';
import StoreModel from './models/StoreModel';

export default class StoreDatabase extends BaseDatabase {

    tableName = 'stores'

    insert = async (input: SignupInput) => {
        try {
            const {
                storeId,
                storeName,
                headId,
                email,
                password,
                CNPJ,
                adress,
                role,
                createdAt,
                updatedAt
            }: SignupInput = input;

            const storeModel = new StoreModel(
                storeId,
                headId,
                email,
                password,
                CNPJ,
                adress,
                role,
                createdAt,
                updatedAt
            )

            const storeInputDB = storeModel.getStoreModel()

            await this.connection(this.tableName).insert(storeInputDB)

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    };
}
