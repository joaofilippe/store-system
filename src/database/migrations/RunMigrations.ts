import ProductsMigrations from './ProductsMigrations'
import StoresMigrations from './StoresMigrations'

const productsMigrations = new ProductsMigrations()
const storeMigrations = new StoresMigrations()

const createTables = async () => {
  await productsMigrations.create()
  await storeMigrations.create()
}

createTables()
