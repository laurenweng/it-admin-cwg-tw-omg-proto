import { ERPCustomerDetail } from "./ERPCustomerDetail";

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
}

export function ERPCustomerCreate({ onClose }: ERPCustomerCreateProps) {
  return (
    <ERPCustomerDetail
      customer={EMPTY_CUSTOMER}
      onClose={onClose}
      createMode
    />
  );
}
