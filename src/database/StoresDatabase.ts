import Stores, { StoresDB, StoreUpdateModel } from '../models/Store'
import { SignupInput } from '../models/Store'
import BaseDatabase from './BaseDatabase'

export default class StoresDatabase extends BaseDatabase {
  tableName = 'stores'

  insert = async (input: SignupInput) => {
    try {
      const storeModel = new Stores(
        input.storeId,
        input.headId,
        input.storeName,
        input.email,
        input.password,
        input.CNPJ,
        input.adress,
        input.role,
        input.createdAt,
        input.updatedAt,
      ).getStoreModel()

      await this.connection(this.tableName).insert(storeModel)
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  selectByEmail = async (email: string): Promise<Stores> => {
    try {
      const result = await this.connection(this.tableName).where({
        email: email,
      })

      const storeFromDB = Stores.toStores(result[0])

      return storeFromDB
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  selectById = async (storeId: string): Promise<Stores> => {
    try {
      const result: StoresDB[] = await this.connection(this.tableName)
        .select()
        .where({ store_id: storeId })

      const storeFromDB = Stores.toStores(result[0])

      return storeFromDB
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async update(store: StoreUpdateModel, store_id: string) {
    try {
      await this.connection(this.tableName)
        .update(store)
        .where(store_id)
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }
}
