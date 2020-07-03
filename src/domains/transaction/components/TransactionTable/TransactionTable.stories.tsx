import React from "react";

import { TransactionTable } from "./TransactionTable";
import { Transaction } from "./TransactionTable.types";

export default { title: "Domains / Transaction / Components / TransactionTable" };

const transactions: Transaction[] = [
	{
		id: "e108519e936027a06b9b6f340ee90a94c69df9d6201d7bfbfd023b8ce81e8224",
		type: "transfer",
		isSent: true,
		timestamp: "17 Mar 2020 22:02:10",
		confirmations: "13",
		sender: "DPTbJqyvrPgBmhs6UFqBwFdyx6jvorxHNL",
		recipient: "DPTbJqyvrPgBmhs6UFqBwFdyx6jvorxHNL",
		amount: "46,95134391 Ѧ",
		fee: "0,08186439 Ѧ",
	},
	{
		id: "e108519e936027a06b9b6f340ee90a94c69df9d6201d7bfbfd023b8ce81e8224",
		type: "vote",
		isSent: true,
		timestamp: "15 Mar 2020 13:21:35",
		confirmations: "52",
		sender: "DPTbJqyvrPgBmhs6UFqBwFdyx6jvorxHNL",
		recipient: "DPTbJqyvrPgBmhs6UFqBwFdyx6jvorxHNL",
		amount: "2 Ѧ",
		fee: "0,08186439 Ѧ",
	},
	{
		id: "e108519e936027a06b9b6f340ee90a94c69df9d6201d7bfbfd023b8ce81e8224",
		type: "secondSignature",
		isSent: true,
		timestamp: "14 Mar 2020 10:02:00",
		confirmations: "52",
		sender: "DPTbJqyvrPgBmhs6UFqBwFdyx6jvorxHNL",
		recipient: "DPTbJqyvrPgBmhs6UFqBwFdyx6jvorxHNL",
		amount: "5 Ѧ",
		fee: "0,08186439 Ѧ",
	},
];
export const Default = () => <TransactionTable data={transactions} />;
