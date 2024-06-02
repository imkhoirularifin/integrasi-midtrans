import { Snap } from 'midtrans-client-typescript/dist/lib/snap';
import { IParameter } from '../Interface/dto/IParameter';
import { ICallbackData } from '../Interface/dto/ICallbackData';
import crypto from 'crypto';
import { IMidtransService } from '../Interface/service/IMidtransService';

export class MidtransService implements IMidtransService {
	// Create Snap API instance
	private serverKey = process.env.MIDTRANS_SERVER_KEY!;
	private clientKey = process.env.MIDTRANS_CLIENT_KEY!;

	constructor() {
		if (!this.serverKey || !this.clientKey) {
			throw new Error('Server Key and Client Key is required');
		}
	}

	private snap = new Snap({
		// Set to true if you want Production Environment (accept real transaction).
		isProduction: false,
		serverKey: this.serverKey,
		clientKey: this.clientKey,
	});

	public async createTransaction(parameter: IParameter): Promise<any> {
		try {
			parameter.transaction_details.order_id = `ORDER-${Math.floor(
				Math.random() * 1000000
			)}`;

			const response = await this.snap.createTransaction(parameter);
			return response;
		} catch (error) {
			throw error;
		}
	}

	public async verifySignatureKey(parameter: ICallbackData): Promise<boolean> {
		const signatureKeyString = `${parameter.order_id}${parameter.status_code}${parameter.gross_amount}${this.serverKey}`;

		// encode SHA512
		const encodedSignatureKey = crypto
			.createHash('sha512')
			.update(signatureKeyString)
			.digest('hex');

		// compare signature key
		if (encodedSignatureKey === parameter.signature_key) {
			return true;
		} else {
			return false;
		}
	}
}
