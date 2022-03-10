import ProductsMigrations from './ProductsMigrations'
import StoresMigrations from './StoresMigrations'

const productsMigrations = new ProductsMigrations()
const storeMigrations = new StoresMigrations()

async function createTables ()  {
  await storeMigrations.create()
  await productsMigrations.create()
}

createTables()
