import { ERPCustomerDetail, DraftCustomer } from "./ERPCustomerDetail";

const EMPTY_CUSTOMER = {
  customerNumber: '',
  customerName: '',
  taxId: '',
  address: '',
  contact: '',
  email: '',
  mobile: '',
  phone: '',
  status: '',
  customerIdentity: '',
  marketingConsentDate: '',
  lastTransactionDate: '',
};

interface ERPCustomerCreateProps {
  onClose: () => void;
  onSaveDraft?: (draft: DraftCustomer) => void;
  initialData?: typeof EMPTY_CUSTOMER;
}

export function ERPCustomerCreate({ onClose, onSaveDraft, initialData }: ERPCustomerCreateProps) {
  return (
    <ERPCustomerDetail
      customer={initialData ?? EMPTY_CUSTOMER}
      onClose={onClose}
      createMode
      onSaveDraft={onSaveDraft}
    />
  );
}
