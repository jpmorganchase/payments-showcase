import React from 'react';
import { AppContext } from '../../context/AppContext';
import { PaymentStatusResponseType } from '../../types/globalPaymentApiTypes';
import previousMockedTransactionsUntyped from '../../mockedJson/uf-mocked-previous-payments.json';
import { paymentsConfig } from './config';

const headers: string[] = [
  'EndToEndId',
  'FirmRootId',
  'Status',
  'Create date/time',
  'Exception',
];

type MockedTransactions = {
  payments: PaymentStatusResponseType[]
};
const previousMockedTransactions: MockedTransactions = previousMockedTransactionsUntyped as MockedTransactions;

function PreviousPaymentsGrid() {
  const {
    displayingMockedData,
    setJsonDialogData,
  } = React.useContext(AppContext);

  let previousPayments: PaymentStatusResponseType[] = JSON.parse(
    sessionStorage.getItem(displayingMockedData ? paymentsConfig.mockedSessionStorageKey : paymentsConfig.sessionStorageKey) || '[]',
  ) as PaymentStatusResponseType[];

  if (displayingMockedData) {
    previousPayments = [...previousPayments, ...previousMockedTransactions.payments];
  }
  return (
    <>
      {(!previousPayments || previousPayments.length === 0) && <p>Make a payment to see previous payments</p>}
      {previousPayments && previousPayments.length > 0
    && (
      <table className="border-collapse table-auto w-full text-sm">
        <thead>
          <tr>{headers.map((header) => <th className="border-b font-medium p-4 pl-8 pt-0 pb-3  text-left" key={header}>{header}</th>)}</tr>
        </thead>

        <tbody>
          {previousPayments && previousPayments.map((payment) => (
            <tr onClick={() => setJsonDialogData({ state: true, data: JSON.stringify(payment, undefined, 2) })} key={`paymentKey-${payment.identifiers.endToEndId}-${payment.identifiers.firmRootId}`}>
              <td className="border-b border-slate-100  p-4 pl-8 ">{payment.identifiers.endToEndId}</td>
              <td className="border-b border-slate-100  p-4 pl-8 ">{payment.identifiers.firmRootId}</td>
              <td className="border-b border-slate-100  p-4 pl-8 ">{payment.paymentStatus?.status ? payment.paymentStatus.status : ''}</td>
              <td className="border-b border-slate-100  p-4 pl-8 ">{payment.paymentStatus?.createDateTime ? payment.paymentStatus?.createDateTime : ''}</td>
              <td className="border-b border-slate-100  p-4 pl-8 ">{payment.exception ? `${payment.exception[0].errorCode} - ${payment.exception[0].errorDescription}` : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

    </>
  );
}

export default PreviousPaymentsGrid;
