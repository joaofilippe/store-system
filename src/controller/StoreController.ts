import express, { Request, Response } from 'express';

export default class StoreController {
    create = async (req: Request, res: Response) => {
        try {
            const { storeName, email, password, role } = req.body;
            const message = { storeName, email, password, role };
            await console.log(message);

            res.send(message);
        } catch (error) {
            const objeto = {
                storeName: 'storeName',
                email: 'email',
                password: 'password',
                role: 'role',
            };
            console.log(error);
            console.log(`Você não nos enviou o objeto ${objeto}`);
        }
    };
}
