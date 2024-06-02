export interface ICallbackData {
	status_code: string;
	transaction_status: string;
	signature_key: string;
	order_id: string;
	payment_type: string;
	fraud_status?: string;
	gross_amount: string;
}
