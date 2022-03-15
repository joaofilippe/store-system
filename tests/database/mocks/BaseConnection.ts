import BaseDatabase from '../../../src/database/BaseDatabase'
import dotenv from 'dotenv';
dotenv.config()

export default class BaseConnection extends BaseDatabase {
  getConnection() {
      return this.connection
  }
}
