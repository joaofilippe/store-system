import Stores, { StoresDB } from '../entities/Stores';
import { SignupInput } from '../entities/Stores';
import BaseDatabase from './BaseDatabase';
import StoreModel from './models/StoreModel';

export default class StoreDatabase extends BaseDatabase {
    tableName = 'stores';

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
                updatedAt,
            }: SignupInput = input;

            const storeModel = new StoreModel(
                storeId,
                headId,
                storeName,
                email,
                password,
                CNPJ,
                adress,
                role,
                createdAt,
                updatedAt
            );

            const storeInputDB = storeModel.getStoreModel();

            await this.connection(this.tableName).insert(
                storeInputDB
            );
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    };

    selectByEmail = async (email: string): Promise<Stores> => {
        try {
            console.log(email)
            const result = await this.connection(this.tableName)
                .where({email: email})


            const storeFromDB = Stores.toStores(result[0]);

            return storeFromDB;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    };

    selectById = async (storeId: string): Promise<Stores> => {
        try {
            const result: StoresDB[] = await this.connection(
                this.tableName
            )
                .select()
                .where({ store_id: storeId });

            const storeFromDB = Stores.toStores(result[0]);

            return storeFromDB;
        } catch (error: any) {
            throw new Error(error);
        }
    };
}
