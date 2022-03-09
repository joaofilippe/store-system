import BaseDatabase from '../BaseDatabase'

const argv: string = process.argv[2]

export default class StoresMigrations extends BaseDatabase {
  tableName: string = 'stores'

  destroy = async () => {
    await this.connection.destroy()
  }

  check = async () => {
    try {
      return await this.connection.schema.hasTable(this.tableName)
    } catch (error: any) {
      console.log(error)
    }
  }

  create = async () => {
    try {
      const check = await this.check()
      if (check) {
        console.log(
          `A tabela "${this.tableName} "já consta em seu banco de dados.`,
        )
      } else {
        await this.connection.schema.createTable(this.tableName, (table) => {
          table.string('store_id').unique().notNullable()
          table.string('head_id').notNullable()
          table.string('store_name')
          table.string('email').notNullable()
          table.string('password')
          table.bigInteger('CNPJ')
          table.string('adress')
          table.enum('role', ['head', 'sub']).notNullable()
          table.timestamp('created_at')
          table.timestamp('updated_at')
        })
        console.log(`A tabela "${this.tableName}" foi criada com sucesso.`)
      }
    } catch (error: any) {
      console.log(error)
    } finally {
      this.connection.destroy()
    }
  }

  drop = async () => {
    try {
      const check = await this.check()

      if (!check) {
        console.log(
          `A tabela "${this.tableName}" não consta em seu banco de dados.`,
        )
      } else {
        await this.connection.schema.dropTable(this.tableName)
        console.log(`A tabela "${this.tableName}" foi excluída com sucesso.`)
      }
    } catch (error: any) {
      console.log(error)
    } finally {
      this.connection.destroy()
    }
  }
}

const migrations = async (argv: string) => {
  const storesMigrations = new StoresMigrations()
  if (argv === 'check') {
    const check = await storesMigrations.check()
    if (check) {
      console.log(
        `A tabela "${storesMigrations.tableName}" já existe em seu banco de dados.`,
      )
    } else {
      console.log(
        `A tabela "${storesMigrations.tableName}" não existe em seu banco de dados.`,
      )
    }
    storesMigrations.destroy()
  } else if (argv === 'create') {
    await storesMigrations.create()
  } else if (argv === 'drop') {
    await storesMigrations.drop()
  } else {
    console.log('Sem parâmetros no terminal.')
  }
}

if (argv) {
  migrations(argv)
}
