export type Transaction = {
	id: string;
	type: string;
	timestamp: string;
	confirmations: string;
	sender: string;
	recipient: string;
	recipients?: { amount: string; address: string }[];
	amount: string;
	fee: string;
	isSent: boolean;
	isSignaturePending?: boolean;
};

export type TransactionStatus = "confirmed" | "pending" | "pendingSignature";
