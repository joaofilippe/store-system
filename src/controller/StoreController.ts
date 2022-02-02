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

    getStoreById = async (req: Request, res: Response) => {

        try {
            const token = req.headers.authorization as string;
            const storeId = req.params.id
    
            const result = await this.storeBusiness.getStoreById({
                token,
                storeId,
            });
            
            res.send(result)

        } catch (error: any) {
            res.send({message: error.message || error.sqlMessage})
        }
    };
    getStoreByEmail = async (req: Request, res: Response) => {

        try {
            const token = req.headers.authorization as string;
            const email = req.query.email as string
    
            const result = await this.storeBusiness.getStoreByEmail({
                token,
                email,
            });
            
            res.send(result)

        } catch (error: any) {
            console.log('Error no Controller',error)
            res.send({message: error.message || error.sqlMessage})
        }
    };
}
