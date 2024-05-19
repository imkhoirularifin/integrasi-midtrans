import { IParameter } from '../Interface/IParameter';
import { MidtransService } from '../service/midtrans.service';
import { Request, Response } from 'express';

export class TransactionController {
	private midtransService: MidtransService;

	constructor() {
		this.midtransService = new MidtransService();
		this.createTransaction = this.createTransaction.bind(this); // Bind the method here
	}

	public async createTransaction(req: Request, res: Response) {
		// get parameter from request body
		const parameter: IParameter = req.body;

		try {
			// validate parameter
			if (!parameter) {
				return res
					.status(400)
					.json({ status: 400, message: 'Parameter is required' });
			}

			const response = await this.midtransService.createTransaction(parameter);
			res.status(200).json({
				status: 200,
				message: 'Success',
				data: response,
			});
		} catch (error: any) {
			res.status(500).json({
				status: 500,
				message: 'Internal server error: ' + error.message,
			});
		}
	}
}
