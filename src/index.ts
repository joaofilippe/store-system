import { app, server } from './app';
import { storesRouter } from './router/StoresRouter';
import { productsRouter } from './router/ProductsRouter';

app.use('/stores', storesRouter);
app.use('/products', productsRouter);
server;
