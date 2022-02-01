import moment from 'moment';
import Stores, {
    LoginDTO,
    SignupDTO,
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
                roleInput,
            } = input;

            const storeId = this.idManager.generateId();

            const role = checkRole(roleInput);

            if (!role) {
                throw new Error('Parâmetros inválidos');
            }

            const headId = this.idManager.headIdChecker(
                role as STORE_ROLE,
                storeId
            );

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

            console.log(storeInput);

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

    login = async (input: LoginDTO) => {
        try {
            const { email, password } = input;

            const storeFromDB = await this.database.selectByEmail(
                email
            );

            const store = storeFromDB.getStore();

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
}
