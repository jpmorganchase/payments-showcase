/* eslint-disable */
import React, { useEffect, useState } from 'react';
import TransactionViz from './TransactionViz';
import TransactionGrid from './transactionGrid/TransactionGrid';
import PropTypes from 'prop-types';
import { isEmptyObject } from '../utils';
import Search from '../search';

// Code taken from: https://stackoverflow.com/questions/46802448/how-do-i-group-items-in-an-array-by-date
const groupTransactionsByDay = (data) => {
  const groups = data.reduce((groups, transaction) => {
    const date = transaction.asOfDate;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});
  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      transactions: groups[date],
    };
  });
  // https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
  return groupArrays.sort(function (a, b) {
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date);
  });
};

const TransactionInfo = ({
  transactions,
  selectedAccount,
  displayingApiData,
  apiData = [],
  ...props
}) => {
  const [searchInput, setSearchInput] = useState('');

  let transactionData = transactions.data;

  const headers = [
    'debitCreditCode',
    'amount',
    'transactionId',
    'baiType',
    'account',
  ];
  const filterTransactionData = () => {
    console.log(searchInput);

    //   transactionData = result;
    //   groupedByDayTransactions = groupTransactionsByDay(transactionData);

    //   console.log(result);
  };

  if (!isEmptyObject(selectedAccount) && selectedAccount.accountId) {
    transactionData = transactionData.filter(function (transaction) {
      return transaction.account.accountId === selectedAccount.accountId;
    });
  }

  if (searchInput.length > 2) {
    transactionData = transactionData.filter((transaction) =>
      headers.some((header) =>
        JSON.stringify(transaction[header])
          .toLowerCase()
          .includes(searchInput.toLowerCase()),
      ),
    );
  }

  let groupedByDayTransactions = groupTransactionsByDay(transactionData);

  return (
    <div className='sm:w-3/5 p-8 flex flex-col w-full'>
      <div className='flex justify-between items-center mb-3'>
        <h2 className='text-2xl font-medium'>All transactions</h2>
        <Search searchInput={searchInput} setSearchInput={setSearchInput} />
        <div>
          <span className='material-icons text-md mr-1'>filter_list</span>
          <span className='material-icons text-md mr-1'>download</span>
        </div>
      </div>

      <>
        <TransactionViz
          groupedByDay={groupedByDayTransactions}
          transactions={transactionData}
          {...props}
        />
        <TransactionGrid
          apiData={apiData}
          displayingApiData={displayingApiData}
          groupedByDay={groupedByDayTransactions}
          {...props}
        />
      </>
    </div>
  );
};

TransactionInfo.propTypes = {
  transactions: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }),
  selectedAccount: PropTypes.object,
  apiData: PropTypes.arrayOf(PropTypes.object),
  displayingApiData: PropTypes.bool,
};

export default TransactionInfo;
