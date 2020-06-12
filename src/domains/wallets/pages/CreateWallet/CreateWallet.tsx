import React from "react";
import { StepIndicator } from "app/components/StepIndicator";
import { Tabs, TabPanel } from "app/components/Tabs";
import { Form, FormField, FormLabel } from "app/components/Form";
import { Header } from "app/components/Header";
import { Alert } from "app/components/Alert";
import { MnemonicList } from "../../components/MnemonicList";
import { MnemonicVerification } from "../../components/MnemonicVerification";
import { Button } from "app/components/Button";
import { Icon } from "app/components/Icon";
import { Divider } from "app/components/Divider";
import { Circle } from "app/components/Circle";
import { CardControl } from "app/components/Card";
import { Input } from "app/components/Input";
import { useForm, useFormContext } from "react-hook-form";

export function FirstStep({ networks }: { networks: Network[] }) {
	const { register, setValue } = useFormContext();

	React.useEffect(() => {
		register("network", { required: true });
	}, [register]);

	return (
		<section data-testid="CreateWallet__first-step" className="space-y-8">
			<div>
				<h1 className="mb-0">Select Network</h1>
				<p className="text-theme-neutral-dark">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
			</div>

			<div className="grid grid-flow-row gap-2">
				{networks.map((network) => (
					<CardControl
						type="radio"
						key={network.name}
						value={network.name}
						name="network"
						onChange={() => setValue("network", network, true)}
					>
						<div className="flex items-center py-2">
							<Circle noShadow>
								<Icon name={network.icon} />
							</Circle>
							<span className="ml-4">{network.name}</span>
						</div>
					</CardControl>
				))}
			</div>
		</section>
	);
}

export function SecondStep({
	mnemonic,
	onCopy,
	onDownload,
}: {
	mnemonic: string[];
	onCopy: () => void;
	onDownload: () => void;
}) {
	return (
		<section data-testid="CreateWallet__second-step">
			<Header title="Your Passphrase" />

			<div className="space-y-8">
				<Alert size="large">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, optio ipsum, porro in dolore ex
					ab iste labore illo perferendis maiores. Ratione quo ipsa adipisci repellendus consectetur ipsam
					facere nostrum.
				</Alert>
				<MnemonicList mnemonic={mnemonic} />
				<Button
					data-testid="CreateWallet__copy"
					onClick={onCopy}
					variant="plain"
					className="flex items-center space-x-2"
				>
					<Icon name="Copy" />
					<span>Copy</span>
				</Button>
			</div>

			<Divider dashed />

			<div className="flex py-3">
				<div className="flex-1">
					<h3 className="mb-1">Your password in the file</h3>
					<p className="text-theme-neutral">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
					<Button
						onClick={onDownload}
						data-testid="CreateWallet__download"
						variant="plain"
						className="mt-4 flex items-center space-x-2"
					>
						<Icon name="Download" />
						<span>Download</span>
					</Button>
				</div>
				<div className="ml-10">
					<Icon name="FilePassword" width={40} height={40} />
				</div>
			</div>

			<Divider dashed />
		</section>
	);
}

export function ThirdStep({ skipVerification, mnemonic }: { skipVerification: boolean; mnemonic: string[] }) {
	const { register, unregister, setValue } = useFormContext();

	React.useEffect(() => {
		register({ name: "verification", type: "custom" }, { required: true });

		if (skipVerification) {
			handleComplete();
		}

		return () => unregister("verification");
	}, [register, unregister, skipVerification]);

	const handleComplete = () => {
		setValue("verification", true, true);
	};

	return (
		<section data-testid="CreateWallet__third-step">
			<h1 className="mb-0">Select Network</h1>
			<p className="text-theme-neutral-dark mb-8">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>

			<MnemonicVerification
				mnemonic={mnemonic}
				wordPositions={[3, 6, 9]}
				optionsLimit={6}
				handleComplete={handleComplete}
			/>

			<Divider dashed />
		</section>
	);
}

export function FourthStep() {
	const { getValues, register } = useFormContext();
	const network: Network = getValues("network");

	return (
		<section data-testid="CreateWallet__fourth-step">
			<h1 className="mb-0">Select Network</h1>
			<p className="text-theme-neutral-dark mb-8">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>

			<ul>
				<li className="flex justify-between">
					<div>
						<p className="text-sm font-semibold text-theme-neutral-dark">Network</p>
						<p data-testid="CrateWallet__network-name" className="text-lg font-medium">
							{network.name}
						</p>
					</div>
					<Circle>
						<Icon name={network.icon} />
					</Circle>
				</li>
				<li>
					<Divider dashed />
				</li>
				<li className="flex justify-between">
					<div>
						<p className="text-sm font-semibold text-theme-neutral-dark">Address</p>
						<p className="text-lg font-medium">D6Z26L69gdk9qYmTv5uzk3uGepigtHY4ax</p>
					</div>
					<Circle />
				</li>
			</ul>

			<Divider dashed />

			<FormField name="name">
				<FormLabel label="Wallet name (optional)" />
				<Input data-testid="CreateWallet__wallet-name" ref={register} />
			</FormField>
		</section>
	);
}

type Network = { name: string; icon: string };

type Props = {
	networks: Network[];
	mnemonic: string[];
	onSubmit: (data: { network: string; name: string }) => void;
	onCopy: () => void;
	onDownload: () => void;
	skipMnemonicVerification?: boolean;
};

export function CreateWallet({ networks, mnemonic, onSubmit, onCopy, onDownload, skipMnemonicVerification }: Props) {
	const [activeTab, setActiveTab] = React.useState(1);

	const form = useForm({ mode: "onChange" });
	const { formState } = form;
	const { isValid } = formState;

	const handleBack = () => {
		setActiveTab(activeTab - 1);
	};

	const handleNext = () => {
		setActiveTab(activeTab + 1);
	};

	return (
		<div className="max-w-lg mx-auto">
			<Form context={form} onSubmit={(data: any) => onSubmit(data)}>
				<Tabs activeId={activeTab}>
					<StepIndicator size={4} activeIndex={activeTab} />

					<div className="mt-4">
						<TabPanel tabId={1}>
							<FirstStep networks={networks} />
						</TabPanel>
						<TabPanel tabId={2}>
							<SecondStep onCopy={onCopy} onDownload={onDownload} mnemonic={mnemonic} />
						</TabPanel>
						<TabPanel tabId={3}>
							<ThirdStep skipVerification={!!skipMnemonicVerification} mnemonic={mnemonic} />
						</TabPanel>
						<TabPanel tabId={4}>
							<FourthStep />
						</TabPanel>

						<div className="mt-6 flex space-x-2 justify-end">
							{activeTab > 1 && (
								<Button data-testid="CreateWallet__back-button" variant="plain" onClick={handleBack}>
									Back
								</Button>
							)}

							{activeTab < 4 && (
								<Button
									data-testid="CreateWallet__continue-button"
									variant="solid"
									disabled={!isValid}
									onClick={handleNext}
								>
									Continue
								</Button>
							)}

							<Button
								data-testid="CreateWallet__save-button"
								type="submit"
								variant="solid"
								className={activeTab === 4 ? "block" : "hidden"}
							>
								Save & Finish
							</Button>
						</div>
					</div>
				</Tabs>
			</Form>
		</div>
	);
}