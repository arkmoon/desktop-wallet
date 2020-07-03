import { Label } from "app/components/Label";
import { Link } from "app/components/Link";
import { Table } from "app/components/Table";
import React from "react";

import { TransactionConfirmationStatus } from "./TransactionConfirmationStatus";
import { TransactionModeItem } from "./TransactionModeItem";
import { TransactionRecipientLabel } from "./TransactionRecipientLabel";
import { Transaction } from "./TransactionTable.types";

type Props = {
	data: Transaction[];
};

export const TransactionTable = ({ data }: Props) => {
	const columns = [
		{
			Header: "ID",
		},
		{
			Header: "Date",
		},
		{
			Header: "Type",
			className: "invisible",
		},
		{
			Header: "Recipient",
		},
		{
			Header: "Info",
		},
		{
			Header: "Status",
			className: "justify-center",
		},
		{
			Header: "Amount",
			className: "justify-end",
		},
	];

	const amountLabelColor = {
		sent: "danger",
		received: "success",
		locks: "warning",
	};

	return (
		<Table columns={columns} data={data}>
			{(row: Transaction) => (
				<tr className="border-b border-dotted border-theme-neutral-300">
					<td className="w-16 py-5">
						<Link href="" tooltip={row.id} isExternal />
					</td>
					<td className="w-48 py-1 text-sm text-theme-neutral-600">{row.timestamp}</td>
					<td className="w-32">
						<TransactionModeItem isSent={row.isSent} type={row.type} recipient={row.recipient} />
					</td>
					<td>
						<TransactionRecipientLabel type={row.type} recipient={row.recipient} />
					</td>
					<td>
						<span />
					</td>
					<td className="w-16 text-center">
						<TransactionConfirmationStatus
							confirmations={row.confirmations}
							isSignaturePending={row.isSignaturePending}
						/>
					</td>
					<td className="text-right">
						{/* @ts-ignore */}
						<Label color={amountLabelColor[row.mode]}>{row.amount}</Label>
					</td>
				</tr>
			)}
		</Table>
	);
};
