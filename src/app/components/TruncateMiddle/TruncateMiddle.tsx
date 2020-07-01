import React from "react";
import { styled } from "twin.macro";

type Props = {
	text: string;
	maxChars?: number;
	as?: React.ElementType;
} & React.HTMLProps<any>;

const Wrapper = styled.span``;

export const TruncateMiddle = ({ text, maxChars, ...props }: Props) => {
	const result = React.useMemo(() => {
		if (!maxChars || text.length <= maxChars) {
			return text;
		}

		const midPos = Math.floor(maxChars / 2) - 2;
		const start = text.substr(0, midPos);
		const end = text.substr(text.length - midPos, text.length);
		return `${start}…${end}`;
	}, [maxChars, text]);

	return <Wrapper {...props}>{result}</Wrapper>;
};

TruncateMiddle.defaultProps = {
	maxChars: 16,
};
