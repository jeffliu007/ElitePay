const GET_ALL_TRANSACTIONS = "transactions/get_all_transactions";
const GET_SINGLE_TRANSACTION = "transactions/get_single_transaction";
const CREATE_NEW_TRANSACTION = "transactions/create_new_transaction";
const UPDATE_TRANSACTION = "transactions/update_transaction";
const DELETE_TRANSACTION = "transactions/delete_transaction";
const ACCEPT_TRANSACTION = "transactions/accept_transaction";

// ------------------------->

// Action creators here

const getAllTransactions = (transactions) => ({
  type: GET_ALL_TRANSACTIONS,
  payload: transactions,
});

const getSingleTransaction = (transaction) => ({
  type: GET_SINGLE_TRANSACTION,
  payload: transaction,
});

const createTransaction = (data) => ({
  type: CREATE_NEW_TRANSACTION,
  payload: data,
});

const updateTransaction = (transaction) => ({
  type: UPDATE_TRANSACTION,
  payload: transaction,
});

const deleteTransaction = (transactionId) => ({
  type: DELETE_TRANSACTION,
  payload: transactionId,
});

const acceptTransaction = (transactionId) => ({
  type: ACCEPT_TRANSACTION,
  transactionId,
});

// ------------------------->

// Transaction feature thunks here
