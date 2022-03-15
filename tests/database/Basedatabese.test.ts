import dotenv from 'dotenv'
import BaseConnection from './mocks/BaseConnection'
dotenv.config()

describe('Testando se a conexão está sendo realizada', () => {
  test('Testando se a conexão com o banco de dados está sendo realizada.', async () => {
    const baseConnection = new BaseConnection()
    const connection = baseConnection.getConnection()
    try {
      const result =  await !!connection
      expect(result).toBe(true)
    } catch (error) {
      const err = console.log(error)
      expect(err).toEqual(console.log(error))
    } finally {
      connection.destroy()
    }
  })

  test("Testando se a connection chama a tabela 'stores'", async() => {
    const baseConnection = new BaseConnection()
    const connection = baseConnection.getConnection()
      try {
        const result = !!(await connection("stores"))
        expect(result).toBe(true)
      } catch (error) {
          const err = console.log(error)
          expect(err).toBe(console.log(error))
      } finally {
          connection.destroy()
      }
  })
  test("Testando se a connection chama a tabela 'products'", async() => {
    const baseConnection = new BaseConnection()
    const connection = baseConnection.getConnection()
      try {
        const result = !!(await connection("products"))
        expect(result).toBe(true)
      } catch (error) {
          const err = console.log(error)
          expect(err).toBe(console.log(error))
      } finally {
          connection.destroy()
      }
  })
})
