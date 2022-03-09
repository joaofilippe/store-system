import {server} from '../src/app'

describe("Verificar servidor",() =>{
    test("Verificar se o servidor existe.", async () =>{
        const result = await server 
        expect(result).toBe(true)
    })
})