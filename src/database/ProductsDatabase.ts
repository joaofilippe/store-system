import Stores, { StoresDB } from '../entities/Stores';
import { SignupInput } from '../entities/Stores';
import BaseDatabase from './BaseDatabase';
import StoreModel from './models/StoreModel';

export default class ProductsDatabase extends BaseDatabase {
    tableName = 'products';

   async function create(input:type) {
       
   }
}
