import express, { Request, Response } from 'express'
import { CreateDTO, SignupDTO } from '../models/Store'
import StoresBusiness from '../business/StoresBusiness'

export default class StoresController {
  storesBusiness = new StoresBusiness()

  signup = async (req: Request, res: Response) => {
    try {
      const { storeName, email, password, CNPJ, adress } = req.body

      const signupDTO: SignupDTO = {
        storeName,
        email,
        password,
        CNPJ,
        adress,
      }

      const token = await this.storesBusiness.signup(signupDTO)

      res.send({ token })
    } catch (error: any) {
      res.send(error.message)
    }
  }

  create = async (req: Request, res: Response) => {
    try {
      const { storeName, email, password, CNPJ, adress } = req.body

      const token = req.headers.authorization as string

      const createDTO: CreateDTO = {
        token,
        storeName,
        email,
        password,
        CNPJ,
        adress,
      }
      await this.storesBusiness.create(createDTO)

      res.send({ message: 'Filial criada com sucesso!' })
    } catch (error: any) {
      res.send(error.message)
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      const loginDTO = {
        email,
        password,
      }

      const token = await this.storesBusiness.login(loginDTO)

      res.send({ token })
    } catch (error: any) {
      res.send(error.sqlMessage || error.message)
    }
  }

  getStoreById = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string
      const storeId = req.params.id

      const result = await this.storesBusiness.getStoreById({
        token,
        storeId,
      })

      res.send(result)
    } catch (error: any) {
      res.send({ message: error.message || error.sqlMessage })
    }
  }

  getStoreByEmail = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string
      const email = req.query.email as string

      const result = await this.storesBusiness.getStoreByEmail({
        token,
        email,
      })

      res.send(result)
    } catch (error: any) {
      res.send({ message: error.message || error.sqlMessage })
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const { storeName, email, password, adress, role } = req.body
      const token = req.headers.authorization
    } catch (error: any) {
      res.send({ message: error.message || error.sqlMessage })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string
      const storeId = req.params.id as string

      await this.storesBusiness.delete(storeId, token)

      res.send({ message: 'Loja deletada com sucesso!' })
    } catch (error: any) {
      res.send(error.message)
    }
  }
}
