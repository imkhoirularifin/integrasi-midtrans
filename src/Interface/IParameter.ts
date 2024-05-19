export interface IParameter {
	transaction_details: transaction_details;
	credit_card: credit_card;
	item_details: item_details[];
	customer_details: customer_details;
}

interface transaction_details {
	order_id?: string;
	gross_amount: number;
}

interface credit_card {
	secure: boolean;
}

interface customer_details {
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
}

interface item_details {
	id: string;
	price: number;
	quantity: number;
	name: string;
}
