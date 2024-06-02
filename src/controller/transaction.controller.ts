import { ITransactionController } from '../Interface/controller/ITransactionController';
import { ICallbackData } from '../Interface/dto/ICallbackData';
import { IParameter } from '../Interface/dto/IParameter';
import { MidtransService } from '../service/midtrans.service';
import { Request, Response } from 'express';

export class TransactionController implements ITransactionController {
	private midtransService: MidtransService;

	constructor() {
		this.midtransService = new MidtransService();
		this.createTransaction = this.createTransaction.bind(this); // Bind the method here
		this.callbackHandler = this.callbackHandler.bind(this); // Bind the method here
	}

	public async createTransaction(req: Request, res: Response): Promise<void> {
		// get parameter from request body
		const parameter: IParameter = req.body;

		try {
			// validate parameter
			if (!parameter) {
				res.status(400).json({ status: 400, message: 'Parameter is required' });
				return;
			}

			const response = await this.midtransService.createTransaction(parameter);
			res.status(200).json({
				status: 200,
				message: 'Success',
				data: response,
			});
			return;
		} catch (error: any) {
			res.status(500).json({
				status: 500,
				message: 'Internal server error: ' + error.message,
			});
			return;
		}
	}

	public async callbackHandler(req: Request, res: Response): Promise<void> {
		// get parameter from request body
		const parameter: ICallbackData = req.body;

		// verify signature key
		const isSignatureKeyValid = await this.midtransService.verifySignatureKey(
			parameter
		);

		if (!isSignatureKeyValid) {
			console.log('Signature key is not valid');
			res.status(200).json({
				message: 'Ok',
			});
			return;
		}

		// check transaction status
		if (parameter.transaction_status == 'capture') {
			if (parameter.fraud_status == 'accept') {
				console.log('Transaction Success');
				res.status(200).json({
					message: 'Ok',
				});
				return;
			} else {
				console.log('Transaction Failed: Fraud detected');
				return;
			}
		} else if (parameter.transaction_status == 'settlement') {
			console.log('Transaction Success');
			res.status(200).json({
				message: 'Ok',
			});
			return;
		} else if (
			parameter.transaction_status == 'cancel' ||
			parameter.transaction_status == 'deny' ||
			parameter.transaction_status == 'expire'
		) {
			console.log('Transaction Failed');
			res.status(200).json({
				message: 'Ok',
			});
			return;
		} else if (parameter.transaction_status == 'pending') {
			console.log('Transaction Pending');
			res.status(200).json({
				message: 'Ok',
			});
			return;
		}
	}
}
