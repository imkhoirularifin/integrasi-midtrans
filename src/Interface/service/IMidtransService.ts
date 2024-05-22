import { IParameter } from '../dto/IParameter';
import { IWebhookData } from '../dto/IWebhookData';

export interface IMidtransService {
	createTransaction(parameter: IParameter): Promise<any>;
	verifySignatureKey(parameter: IWebhookData): Promise<boolean>;
}
