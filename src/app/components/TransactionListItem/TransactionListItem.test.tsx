import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";

import { TransactionListItem } from "./TransactionListItem";

describe("TransactionListItem", () => {
	it("should render a send transaction", () => {
		const tx = {
			date: "17 Mar 2020 22:02:10",
			avatarId: "test",
			type: "send",
			address: "ASuusXSW9kfWnicScSgUTjttP6T9GQ3kqT",
			walletName: "My Wallet",
			amount: "100 BTC",
			fiat: "1,000,000 USD",
		};

		const { container } = render(
			<table>
				<tbody>
					<TransactionListItem
						date={tx.date}
						avatarId={tx.avatarId}
						type={tx.type}
						address={tx.address}
						walletName={tx.walletName}
						amount={tx.amount}
						fiat={tx.fiat}
					></TransactionListItem>
				</tbody>
			</table>,
		);
		expect(container).toMatchSnapshot();
	});

	it("should render a received transaction", () => {
		const tx = {
			date: "17 Mar 2020 22:02:10",
			avatarId: "test",
			type: "receive",
			address: "ASuusXSW9kfWnicScSgUTjttP6T9GQ3kqT",
			walletName: "My Wallet",
			amount: "100 BTC",
			fiat: "1,000,000 USD",
		};

		const { container } = render(
			<table>
				<tbody>
					<TransactionListItem
						date={tx.date}
						avatarId={tx.avatarId}
						type={tx.type}
						address={tx.address}
						walletName={tx.walletName}
						amount={tx.amount}
						fiat={tx.fiat}
					></TransactionListItem>
				</tbody>
			</table>,
		);
		expect(container).toMatchSnapshot();
	});

	it("should render compact variant", () => {
		const tx = {
			date: "17 Mar 2020 22:02:10",
			avatarId: "test",
			type: "receive",
			address: "ASuusXSW9kfWnicScSgUTjttP6T9GQ3kqT",
			walletName: "My Wallet",
			amount: "100 BTC",
			fiat: "1,000,000 USD",
		};

		const { container } = render(
			<table>
				<tbody>
					<TransactionListItem
						variant="compact"
						date={tx.date}
						avatarId={tx.avatarId}
						type={tx.type}
						address={tx.address}
						walletName={tx.walletName}
						amount={tx.amount}
						fiat={tx.fiat}
					></TransactionListItem>
				</tbody>
			</table>,
		);
		expect(container).toMatchSnapshot();
	});

	it("should emit onClick event", () => {
		const fn = jest.fn();

		const tx = {
			date: "17 Mar 2020 22:02:10",
			avatarId: "test",
			type: "receive",
			address: "ASuusXSW9kfWnicScSgUTjttP6T9GQ3kqT",
			walletName: "My Wallet",
			amount: "100 BTC",
			fiat: "1,000,000 USD",
		};

		const { getByTestId } = render(
			<table>
				<tbody>
					<TransactionListItem
						date={tx.date}
						avatarId={tx.avatarId}
						type={tx.type}
						address={tx.address}
						walletName={tx.walletName}
						amount={tx.amount}
						fiat={tx.fiat}
						onClick={fn}
					></TransactionListItem>
				</tbody>
			</table>,
		);
		const txRow = getByTestId("transaction__row");

		act(() => {
			fireEvent.click(txRow);
		});

		expect(fn).toBeCalled();
	});

	it("should prevent onClick event when callback not provided", () => {
		const fn = jest.fn();

		const tx = {
			date: "17 Mar 2020 22:02:10",
			avatarId: "test",
			type: "receive",
			address: "ASuusXSW9kfWnicScSgUTjttP6T9GQ3kqT",
			walletName: "My Wallet",
			amount: "100 BTC",
			fiat: "1,000,000 USD",
		};

		const { getByTestId } = render(
			<table>
				<tbody>
					<TransactionListItem
						date={tx.date}
						avatarId={tx.avatarId}
						type={tx.type}
						address={tx.address}
						walletName={tx.walletName}
						amount={tx.amount}
						fiat={tx.fiat}
					></TransactionListItem>
				</tbody>
			</table>,
		);
		const txRow = getByTestId("transaction__row");

		act(() => {
			fireEvent.click(txRow);
		});

		expect(fn).not.toBeCalled();
	});
});