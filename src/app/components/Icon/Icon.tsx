// Assets
import { SvgCollection } from "app/assets/svg";
import React from "react";
import { styled } from "twin.macro";

type Props = {
	name: string;
	as?: React.ElementType;
	width?: number | string;
	height?: number | string;
} & React.HTMLProps<any>;

type WrapperProps = {
	width: number | string;
	height: number | string;
};

const Wrapper = styled.div(({ width, height }: WrapperProps) => ({
	svg: {
		width,
		height,
	},
}));

export const Icon = ({ name, width, height, ...props }: Props) => {
	const Svg = SvgCollection[name];

	return (
		<Wrapper width={width!} height={height!} {...props}>
			{Svg && <Svg />}
		</Wrapper>
	);
};

Icon.defaultProps = {
	width: "1em",
	height: "1em",
};
