import BaseDatabase from '../BaseDatabase';

const argv: string = process.argv[2];

class ProductsMigrations extends BaseDatabase {
    tableName: string = 'products';
    
    destroy = async() => {
        await this.connection.destroy()
    }

    check = async () => {
        try {
            return await this.connection.schema.hasTable(
                this.tableName
            );
        } catch (error: any) {
            console.log(error);
        }
    };

    create = async () => {
        try {
            const check = await this.check();
            if (check) {
                console.log(
                    `A tabela "${this.tableName} "já consta em seu banco de dados.`
                );
            } else {
                await this.connection.schema.createTable(
                    this.tableName,
                    (table) => {
                        table
                            .string('product_id')
                            .primary()
                            .notNullable();
                        table.string('product_name').notNullable();
                        table.string('brand').notNullable();
                        table.string('store_id').references('store_id').inTable('stores');
                        table.string('head_id').references('head_id').inTable('stores');
                        table.bigInteger('quantity');
                        table.decimal('price(R$)', 14, 2);
                        table.timestamp('created_at');
                        table.timestamp('updated_at');
                    }
                );
            }
        } catch (error: any) {
            console.log(error);
        } finally {
            this.connection.destroy();
        }

        console.log(
            `A tabela "${this.tableName}" foi criada com sucesso.`
        );
    };

    drop = async () => {
        try {
            const check = await this.check();

            if (!check) {
                console.log(
                    `A tabela "${this.tableName}" não consta em seu banco de dados.`
                );
            } else {
                await this.connection.schema.dropTable(
                    this.tableName
                );
                console.log(
                    `A tabela "${this.tableName}" foi excluída com sucesso.`
                );
            }
        } catch (error: any) {
            console.log(error);
        } finally {
            this.connection.destroy();
        }
    };
}

const migrations = async (argv: string) => {
    const productsMigrations = new ProductsMigrations();
    if (argv === 'check') {
        const check = await productsMigrations.check();
        if (check) {
            console.log(
                `A tabela "${productsMigrations.tableName}" já existe em seu banco de dados.`
            );
        } else {
            console.log(
                `A tabela "${productsMigrations.tableName}" não existe em seu banco de dados.`
            );
            productsMigrations.destroy()
        }
    } else if (argv === 'create') {
        await productsMigrations.create();
    } else if (argv === 'drop') {
        await productsMigrations.drop();
    } else {
        console.log('Parâmetros inválidos');
    }
};

migrations(argv);
