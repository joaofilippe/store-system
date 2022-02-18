import { v4 } from 'uuid';
import { STORE_ROLE } from '../entities/Stores';

export default class IdManager {
    generateId(): string {
        return v4();
    }
}
