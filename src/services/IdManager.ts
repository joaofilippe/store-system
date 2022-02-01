import { v4 } from 'uuid';
import { STORE_ROLE } from '../entities/Stores';

export default class IdManager {
    generateId(): string {
        return v4();
    }

    headIdChecker(
        role: STORE_ROLE,
        storeId: string
    ): string  {
        let headId;
        if (role == STORE_ROLE.HEAD) {
            headId = storeId;
            return headId;
        } else {
            headId = this.generateId();
            return headId;
        }
    }
}
