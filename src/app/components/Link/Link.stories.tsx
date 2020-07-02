import React from "react";

import { Link } from "./Link";

export default { title: "App / Components / Link" };

export const Default = () => <Link href="#">Wallets</Link>;
export const External = () => (
	<Link href="https://ark.io" isExternal>
		ARK.io
	</Link>
);
export const WithTooltip = () => <Link href="https://ark.io" isExternal tooltip="ASuusXSW9kfWnicScSgUTjttP6T9GQ3kqT" />;
