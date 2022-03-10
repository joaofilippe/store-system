import { server } from '../src/app'

const returnTrue = () => {
  return true
}

describe('Verificar servidor', () => {
  test('Verificar se o servidor existe.', async () => {
    try {
      const result = !!(await server)
      expect(result).toBe(true)
    } catch (error) {
      console.log(error)
    } finally {
      server.close()
    }
  })
})
