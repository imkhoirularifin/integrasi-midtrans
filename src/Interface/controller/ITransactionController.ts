import { Request, Response } from 'express';

export interface ITransactionController {
	createTransaction(req: Request, res: Response): Promise<void>;
	webhookHandler(req: Request, res: Response): Promise<void>;
}
