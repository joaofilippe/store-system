import express, { Request, Response } from 'express';
import { SignupDTO } from '../entities/Stores';
import StoreBusiness from '../business/StoreBusiness';
import Authenticator from '../services/Authenticator';

export default class StoreController {
    storeBusiness = new StoreBusiness();

    create = async (req: Request, res: Response) => {
        try {
            const {
                storeName,
                email,
                password,
                CNPJ,
                adress,
                roleInput,
            } = req.body;

            const signupDTO: SignupDTO = {
                storeName,
                email,
                password,
                CNPJ,
                adress,
                roleInput,
            };

            const token = await this.storeBusiness.signup(signupDTO);

            res.send({ token });
        } catch (error: any) {
            res.send(error.message);
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const loginDTO = {
                email,
                password,
            };

            const token = await this.storeBusiness.login(loginDTO);

            res.send({ token });
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    };
}
