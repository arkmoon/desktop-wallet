import Tippy from "@tippyjs/react";
import React from "react";
import { styled } from "twin.macro";

import { Icon } from "../Icon";

type Props = {
	isExternal?: boolean;
	children?: React.ReactNode;
	as?: React.ElementType;
	tooltip?: string;
} & React.AnchorHTMLAttributes<any>;

const Anchor = styled.a<{ isExternal: boolean }>`
	${({ isExternal }) =>
		isExternal &&
		`
		text-decoration: underline;
		text-decoration-style: dotted;
		&:active {
			text-decoration-style: dotted;
		}
		&:hover:not(:active) {
			text-decoration: none;
		}
	`}
`;

export const Link = ({ isExternal, children, tooltip, ...props }: Props) => {
	return (
		<Tippy content={tooltip} disabled={!tooltip}>
			<Anchor
				data-testid="Link"
				isExternal={isExternal!}
				className="transition-colors duration-200 text-theme-primary font-semibold cursor-pointer inline-flex items-center hover:text-theme-primary-dark hover:underline active:text-theme-primary-500"
				target={isExternal ? "_blank" : props.target}
				rel={isExternal ? "noopener noreferrer" : props.rel}
				{...props}
			>
				{children}
				{isExternal && (
					<Icon
						data-testid="Link__external"
						name="LinkWeb"
						className={`flex-shrink-0 ${children ? "ml-2 text-sm" : "text-theme-primary"}`}
					/>
				)}
			</Anchor>
		</Tippy>
	);
};

Link.defaultProps = {
	isExternal: false,
};
