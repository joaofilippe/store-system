import moment from 'moment';
import Stores, {
    CreateDTO,
    EnrollSubDTO,
    GetStoreByEmailDTO,
    GetStoreByIdDTO,
    LoginDTO,
    SignupDTO,
    StoresReturn,
    STORE_ROLE,
} from '../entities/Stores';
import { checkRole } from '../services/CheckRole';
import HashManager from '../services/HashManager';
import IdManager from '../services/IdManager';
import Authenticator from '../services/Authenticator';
import StoreDatabase from '../database/StoreDatabase';

export default class StoreBusiness {
    hashManager = new HashManager();
    idManager = new IdManager();
    authenticator = new Authenticator();
    database = new StoreDatabase();

    signup = async (input: SignupDTO): Promise<string> => {
        try {
            const {
                storeName,
                email,
                password,
                CNPJ,
                adress,
            } = input;

            const storeId = await this.idManager.generateId();
            const headId = storeId
            const role = STORE_ROLE.HEAD;
            
            const hashedPassword = await this.hashManager.hash(
                password
            );

            const createdAt = moment()
                .format('YYYY-MM-DD hh:mm:ss')
                .toString();
            const updatedAt = createdAt;

            const store = new Stores(
                storeId,
                storeName,
                headId,
                email,
                hashedPassword,
                CNPJ,
                adress,
                role as STORE_ROLE,
                createdAt,
                updatedAt
            );

            const storeInput = store.getStore();

            await this.database.insert(storeInput);

            const token: string = this.authenticator.generateToken({
                storeId,
                headId,
                role,
            });

            return token;
        } catch (error: any) {
            const message = error.message;
            throw new Error(error.message);
        }
    };

    create = async (input: CreateDTO) => {
        try {
            const {
                token,
                storeName,
                email,
                password,
                CNPJ,
                adress,
            } = input;
            
            if(!token) {
                throw new Error ('Você precisa estar logado como Matriz para cadastrar uma Filial.')
            }
            const role = STORE_ROLE.SUB;
            
            const createdAt = moment()
                .format('YYYY-MM-DD hh:mm:ss')
                .toString();
            
            const updatedAt = createdAt;
            
            const hashedPassword = await this.hashManager.hash(
                password
            );

            const storeId = await this.idManager.generateId();
            const tokenData = await this.authenticator.getTokenData(token)

            const tokenRole = tokenData.role

            if(tokenRole !== STORE_ROLE.HEAD){
                throw new Error ('Você precisa estar logado como Matriz para cadastrar uma Filial.')
            }

            const headId = tokenData.headId
            
            const store = new Stores(
                storeId,
                storeName,
                headId,
                email,
                hashedPassword,
                CNPJ,
                adress,
                role as STORE_ROLE,
                createdAt,
                updatedAt
            );

            const storeInput = store.getStore();


            await this.database.insert(storeInput);

        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    login = async (input: LoginDTO) => {
        try {
            const { email, password } = input;

            const result = await this.database.selectByEmail(
                email
            );

            const store = result.getStore();

            const { storeId, headId, role } = store;


            const passwordDB = store.password;

            const token = await this.authenticator.generateToken({
                storeId,
                headId,
                role,
            });

            const comparePasswords = await this.hashManager.compare(
                password,
                passwordDB
            );

            if (!comparePasswords) {
                throw new Error(
                    'Credenciais inválidas. Verique seu email e sua senha.'
                );
            }

            return token;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    };

    enrollSub = async (input: EnrollSubDTO) => {
        const { token, storeName, email, password, CNPJ, adress } =
            input;

        const storeId = await this.idManager.generateId();

        const role = STORE_ROLE.SUB;

        const tokenData = await this.authenticator.getTokenData(
            token
        );
        const headId = tokenData.headId;

        const hashedPassword = await this.hashManager.hash(password);

        const createdAt = moment().format('YYYY-MM-DD hh:mm:ss');
        const updatedAt = createdAt;

        const stores = new Stores(
            storeId,
            storeName,
            headId,
            email,
            hashedPassword,
            CNPJ,
            adress,
            role,
            createdAt,
            updatedAt
        );

        const storeInputDB = stores.getStore();

        await this.database.insert(storeInputDB);

        try {
        } catch (error: any) {
            throw new Error('');
        }
    };

    getStoreById = async (
        input: GetStoreByIdDTO
    ): Promise<StoresReturn> => {
        try {
            const { token, storeId } = input;
            const tokenData = await this.authenticator.getTokenData(
                token
            );

            const result = await this.database.selectById(storeId);

            const store = result.getStore();

            const DbStoreId = store.storeId;
            const DbHeadId = store.headId;

            const tokenStoreId = tokenData.storeId;
            const tokenHeadId = tokenData.headId;
            const tokenRole = tokenData.role;

            if (tokenRole === STORE_ROLE.HEAD) {
                if (DbHeadId !== tokenHeadId) {
                    throw new Error(
                        'Você não pode requisitar informações de outra rede de lojas.'
                    );
                } else {
                    return store;
                }
            } else if (tokenRole === STORE_ROLE.SUB) {
                if (DbStoreId !== tokenStoreId) {
                    throw new Error(
                        'Você não pode requisitar informações de outras lojas.'
                    );
                } else {
                    return store;
                }
            } else {
                throw new Error(
                    'Por favor, verifique suas credenciais.'
                );
            }
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    };

    getStoreByEmail = async (
        input: GetStoreByEmailDTO
    ): Promise<StoresReturn> => {
        try {
            const { token, email } = input;
            const result = await this.database.selectByEmail(email);

            const tokenData = await this.authenticator.getTokenData(
                token
            );

            const store = result.getStore();

            const DbStoreId = store.storeId;
            const DbHeadId = store.headId;

            const tokenStoreId = tokenData.storeId;
            const tokenHeadId = tokenData.headId;
            const tokenRole = tokenData.role;

            if (tokenRole === STORE_ROLE.HEAD) {
                if (DbHeadId !== tokenHeadId) {
                    throw new Error(
                        'Você não pode requisitar informações de outra rede de lojas.'
                    );
                } else {
                    return store;
                }
            } else if (tokenRole === STORE_ROLE.SUB) {
                if (DbStoreId !== tokenStoreId) {
                    throw new Error(
                        'Você não pode requisitar informações de outras lojas.'
                    );
                } else {
                    return store;
                }
            } else {
                throw new Error(
                    'Por favor, verifique suas credenciais.'
                );
            }
        } catch (error: any) {
            console.log('Error no Business', error);
            throw new Error(error.sqlMessage || error.message);
        }
    };
}
