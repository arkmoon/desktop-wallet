import { BigNumber } from "@arkecosystem/platform-sdk-support";
import Tippy from "@tippyjs/react";
import { Icon } from "app/components/Icon";
import React from "react";

import { TransactionStatus } from "./TransactionTable.types";

type Props = {
	isSignaturePending?: boolean;
	confirmations: string;
};

// TODO: Replace by sdk
const getStatus = (confirmations: string, isSignaturePending?: boolean): TransactionStatus => {
	if (isSignaturePending) {
		return "pendingSignature";
	} else if (BigNumber.make(confirmations).isGreaterThan(51)) {
		return "confirmed";
	} else {
		return "pending";
	}
};

export const TransactionConfirmationStatus = ({ confirmations, isSignaturePending }: Props) => {
	const tooltipContent = React.useMemo(
		() => (isSignaturePending ? "Action Required" : `${confirmations} confirmations`),
		[confirmations, isSignaturePending],
	);
	const status = React.useMemo(() => getStatus(confirmations, isSignaturePending), [
		confirmations,
		isSignaturePending,
	]);

	const iconName = {
		confirmed: "Ok",
		pending: "StatusClock",
		pendingSignature: "Edit",
	};

	const iconStyle = {
		confirmed: "text-theme-success",
		pending: "text-theme-warning",
		pendingSignature: "text-theme-danger",
	};

	return (
		<Tippy content={tooltipContent}>
			<div className="inline-block p-1">
				<Icon name={iconName[status]} className={iconStyle[status]} />
			</div>
		</Tippy>
	);
};
