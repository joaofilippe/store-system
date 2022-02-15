import { app, server } from './app';
import { storeRouter } from './router/StoresRouter';

app.use('/stores', storeRouter);

server;
