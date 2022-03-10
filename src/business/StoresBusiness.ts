import moment from 'moment'
import Store, {
  CreateDTO,
  EnrollSubDTO,
  GetStoreByEmailDTO,
  GetStoreByIdDTO,
  LoginDTO,
  SignupDTO,
  StoresReturn,
  STORE_ROLE,
} from '../models/Store'
import HashManager from '../services/HashManager'
import IdManager from '../services/IdManager'
import Authenticator from '../services/Authenticator'
import StoreDatabase from '../database/StoresDatabase'

export default class StoresBusiness {
  hashManager = new HashManager()
  idManager = new IdManager()
  authenticator = new Authenticator()
  database = new StoreDatabase()

  signup = async (input: SignupDTO): Promise<string> => {
    try {
      const { storeName, email, password, CNPJ, adress } = input

      const storeId = await this.idManager.generateId()
      const headId = storeId
      const role = STORE_ROLE.HEAD

      const hashedPassword = await this.hashManager.hash(password)

      const createdAt = moment().format('YYYY-MM-DD hh:mm:ss').toString()
      const updatedAt = createdAt

      const store = new Store(
        storeId,
        headId,
        storeName,
        email,
        hashedPassword,
        CNPJ,
        adress,
        role as STORE_ROLE,
        createdAt,
        updatedAt,
      )
      await this.database.insert(store)

      const token: string = this.authenticator.generateToken({
        storeId,
        headId,
        role,
      })

      return token
    } catch (error: any) {
      const message = error.message
      throw new Error(error.message)
    }
  }

  create = async (input: CreateDTO) => {
    try {
      const { token, storeName, email, password, CNPJ, adress } = input

      if (!token) {
        throw new Error(
          'Você precisa estar logado como Matriz para cadastrar uma Filial.',
        )
      }
      const role = STORE_ROLE.SUB

      const createdAt = moment().format('YYYY-MM-DD hh:mm:ss').toString()

      const updatedAt = createdAt

      const hashedPassword = await this.hashManager.hash(password)

      const storeId = await this.idManager.generateId()
      const tokenData = await this.authenticator.getTokenData(token)

      const tokenRole = tokenData.role

      if (tokenRole !== STORE_ROLE.HEAD) {
        throw new Error(
          'Você precisa estar logado como Matriz para cadastrar uma Filial.',
        )
      }

      const headId = tokenData.headId

      const store = new Store(
        storeId,
        headId,
        storeName,
        email,
        hashedPassword,
        CNPJ,
        adress,
        role as STORE_ROLE,
        createdAt,
        updatedAt,
      )

      await this.database.insert(store)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  login = async (input: LoginDTO) => {
    try {
      const { email, password } = input

      const result = await this.database.selectByEmail(email)

      if (!result) {
        throw new Error(
          `Por favor, verifique o "email" e a "senha" informados.`,
        )
      }

      const store = result.getStore()

      const { storeId, headId, role } = store

      const passwordDB = store.password

      const token = await this.authenticator.generateToken({
        storeId,
        headId,
        role,
      })

      const comparePasswords = await this.hashManager.compare(
        password,
        passwordDB,
      )

      if (!comparePasswords) {
        throw new Error('Credenciais inválidas. Verique seu email e sua senha.')
      }

      return token
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  enrollSub = async (input: EnrollSubDTO) => {
    const { token, storeName, email, password, CNPJ, adress } = input

    const storeId = await this.idManager.generateId()

    const role = STORE_ROLE.SUB

    const tokenData = await this.authenticator.getTokenData(token)
    const headId = tokenData.headId

    const hashedPassword = await this.hashManager.hash(password)

    const createdAt = moment().format('YYYY-MM-DD hh:mm:ss')
    const updatedAt = createdAt

    const store = new Store(
      storeId,
      storeName,
      headId,
      email,
      hashedPassword,
      CNPJ,
      adress,
      role,
      createdAt,
      updatedAt,
    )

    await this.database.insert(store)

    try {
    } catch (error: any) {
      throw new Error('')
    }
  }

  getStoreById = async (input: GetStoreByIdDTO): Promise<StoresReturn> => {
    try {
      const { token, storeId } = input
      const tokenData = await this.authenticator.getTokenData(token)

      const result = await this.database.selectById(storeId)

      const store = result.getStore()

      const DbStoreId = store.storeId
      const DbHeadId = store.headId

      const tokenStoreId = tokenData.storeId
      const tokenHeadId = tokenData.headId
      const tokenRole = tokenData.role

      if (tokenRole === STORE_ROLE.HEAD) {
        if (DbHeadId !== tokenHeadId) {
          throw new Error(
            'Você não pode requisitar informações de outra rede de lojas.',
          )
        } else {
          return store
        }
      } else if (tokenRole === STORE_ROLE.SUB) {
        if (DbStoreId !== tokenStoreId) {
          throw new Error(
            'Você não pode requisitar informações de outras lojas.',
          )
        } else {
          return store
        }
      } else {
        throw new Error('Por favor, verifique suas credenciais.')
      }
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  getStoreByEmail = async (
    input: GetStoreByEmailDTO,
  ): Promise<StoresReturn> => {
    try {
      const { token, email } = input
      const result = await this.database.selectByEmail(email)

      const tokenData = await this.authenticator.getTokenData(token)

      const store = result.getStore()

      const DbStoreId = store.storeId
      const DbHeadId = store.headId

      const tokenStoreId = tokenData.storeId
      const tokenHeadId = tokenData.headId
      const tokenRole = tokenData.role

      if (tokenRole === STORE_ROLE.HEAD) {
        if (DbHeadId !== tokenHeadId) {
          throw new Error(
            'Você não pode requisitar informações de outra rede de lojas.',
          )
        } else {
          return store
        }
      } else if (tokenRole === STORE_ROLE.SUB) {
        if (DbStoreId !== tokenStoreId) {
          throw new Error(
            'Você não pode requisitar informações de outras lojas.',
          )
        } else {
          return store
        }
      } else {
        throw new Error('Por favor, verifique suas credenciais.')
      }
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async update(input: any, storeId: string, token: string) {
    try {
      const updatedAt = moment().format('YYYY-MM-DD hh:mm:ss').toString()
      const result = await this.database.selectById(storeId)
      const storeFromDB = result.getStore()

      const tokenData = await this.authenticator.getTokenData(token)
      const tokenStoreId = tokenData.storeId
      const tokenHeadId = tokenData.headId
      const tokenRole = tokenData.role
      if (!result) {
        throw new Error('A loja informada não consta no banco de dados!!!')
      }
   

      if (tokenRole !== 'head' && !(tokenStoreId === storeId)) {
        throw new Error(
          'Somente as próprias lojas ou suas matrizes podem alterar seus registros.',
        )
      } else if (tokenStoreId != storeFromDB.headId) {
        throw new Error(
          'Somente as próprias lojas ou suas matrizes podem alterar seus registros.',
        )
      }

      if (input.password) {
        input.password = await this.hashManager.hash(input.password)
      }

      const storeUpdate = {
        store_name: input.storeName ? input.storeName : storeFromDB.storeName,
        CNPJ: input.CNPJ ? input.CNPJ : storeFromDB.CNPJ,
        password: input.password ? input.storeName : storeFromDB.password,
        adress: input.adress ? input.adress : storeFromDB.adress,
        updated_at: updatedAt,
      }

      await this.database.update(input, storeId)

      let message = 'Sucesso'

      return message
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async delete(storeId: string, token: string) {
    try {
      const storeFromDB = await this.database.selectById(storeId)
      const store = storeFromDB.getStore()
      const tokenData = await this.authenticator.getTokenData(token)
      const tokenStoreId = tokenData.storeId
      const tokenHeadId = tokenData.headId
      const tokenRole = tokenData.role

      if (!(tokenStoreId === storeId)) {
        if (!(tokenHeadId === store.headId)) {
          throw new Error(
            'Somente as próprias lojas ou suas matrizes podem deletar seus registros.',
          )
        }
      }

      await this.database.delete(storeId)
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }
}
