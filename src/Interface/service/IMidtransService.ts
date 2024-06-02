import { IParameter } from '../dto/IParameter';
import { ICallbackData } from '../dto/ICallbackData';

export interface IMidtransService {
	createTransaction(parameter: IParameter): Promise<any>;
	verifySignatureKey(parameter: ICallbackData): Promise<boolean>;
}
