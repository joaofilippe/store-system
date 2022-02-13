import { app, server } from './app';
import { storeRouter } from './router/StoreRouter';

app.use('/stores', storeRouter);

server;
