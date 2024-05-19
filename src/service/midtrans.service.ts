import { Snap } from 'midtrans-client-typescript/dist/lib/snap';
import { IParameter } from '../Interface/IParameter';

export class MidtransService {
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
}
