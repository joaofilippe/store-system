import { app, server } from './app';
import { storesRouter } from './router/StoresRouter';
import { productsRouter } from './router/ProductsRouter';
import StoresMigrations from './database/migrations/StoresMigrations';
import ProductsMigrations from './database/migrations/ProductsMigrations';


new StoresMigrations().create()
new ProductsMigrations().create()
app.use('/stores', storesRouter);
app.use('/products', productsRouter);
server