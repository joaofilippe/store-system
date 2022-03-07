import express from 'express'
import StoresController from '../controller/StoresController'

export const storesRouter = express.Router()
const storesController = new StoresController()

storesRouter.post('/signup', storesController.signup)
storesRouter.post('/login', storesController.login)
storesRouter.post('/create', storesController.create)
storesRouter.put('/:id', storesController.update)
storesRouter.get('/search/', storesController.getStoreByEmail)
storesRouter.get('/:id', storesController.getStoreById)
storesRouter.delete('/:id', storesController.delete)
