import { STORE_ROLE } from '../entities/Stores';
export function checkRole(input: string): STORE_ROLE | undefined {
    let role: STORE_ROLE;

    if (input.toLowerCase() === 'head') {
        role = STORE_ROLE.HEAD;
        return role;
    } else if (input.toLowerCase() === 'sub') {
        role = STORE_ROLE.SUB;
        return role;
    }     
}
