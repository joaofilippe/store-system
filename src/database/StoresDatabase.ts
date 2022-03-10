import Stores, { StoresDB, StoreUpdateModel } from '../models/Store'
import Store, { SignupInput } from '../models/Store'
import BaseDatabase from './BaseDatabase'

export default class StoresDatabase extends BaseDatabase {
  tableName = 'stores'

  insert = async (store: Store) => {
    try {
      const storeModel = store.getStoreModel()
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

  async selectById(store_id: string): Promise<Stores> {
    try {
      const result: StoresDB[] = await this.connection(this.tableName)
        .select()
        .where({store_id})
      const storeFromDB = Stores.toStores(result[0])

      return storeFromDB
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async update(store: any, store_id: string) {
    try {
      await this.connection(this.tableName).update(store).where({store_id : store_id})
    } catch (error: any) {
      throw new Error(`Error na Database: ${error.sqlMessage || error.message}`)
    }
  }

  async delete(store_id: string) {
    try {
      this.connection(this.tableName).delete().where(store_id)
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }
}
