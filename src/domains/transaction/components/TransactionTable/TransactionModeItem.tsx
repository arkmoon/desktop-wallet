import Tippy from "@tippyjs/react";
import { Circle } from "app/components/Circle";
import { Icon } from "app/components/Icon";
import React from "react";

import { TransactionRecipientIcon } from "./TransactionRecipientIcon";

type Props = {
	type: string;
	isSent: boolean;
	recipient: string;
};

export const TransactionModeItem = ({ type, isSent, recipient }: Props) => {
	// TODO: i18n
	const tooltipContent = isSent ? "Sent" : "Received";
	const modeIconName = isSent ? "Sent" : "Received";
	const modeCircleStyle = isSent
		? "border-theme-danger-contrast text-theme-danger"
		: "border-theme-success-300 text-theme-success";

	return (
		<div className="flex items-center -space-x-1">
			<Tippy content={tooltipContent}>
				<Circle className={modeCircleStyle}>
					<Icon name={modeIconName} />
				</Circle>
			</Tippy>
			<TransactionRecipientIcon recipient={recipient} type={type} className={modeCircleStyle} />
		</div>
	);
};
