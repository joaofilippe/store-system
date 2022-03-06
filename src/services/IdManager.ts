import { v4 } from 'uuid';
import { STORE_ROLE } from '../models/Store';

export default class IdManager {
    generateId(): string {
        return v4();
    }
}
