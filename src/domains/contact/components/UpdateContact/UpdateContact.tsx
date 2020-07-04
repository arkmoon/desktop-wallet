import { Modal } from "app/components/Modal";
import { ContactForm } from "domains/contact/components/ContactForm";
import React from "react";
import { useTranslation } from "react-i18next";

type UpdateContactProps = {
	isOpen: boolean;
	contact: any;
	assets: any;
	onClose?: any;
	onCancel?: any;
	onDelete: any;
	onSave: any;
};

export const UpdateContact = ({ isOpen, contact, assets, onClose, onCancel, onDelete, onSave }: UpdateContactProps) => {
	const { t } = useTranslation();

	return (
		<Modal title={t("CONTACTS.MODAL_UPDATE_CONTACT.TITLE")} isOpen={isOpen} onClose={onClose}>
			<div className="mt-8">
				<ContactForm
					contact={contact}
					assets={assets}
					onCancel={onCancel}
					onDelete={onDelete}
					onSave={onSave}
				/>
			</div>
		</Modal>
	);
};

UpdateContact.defaultProps = {
	isOpen: false,
	assets: [],
};