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

export const thunkGetAllTransactions = () => async (dispatch) => {
  const response = await fetch("/api/transactions/", {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllTransactions(data.allTransactions));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const thunkGetSingleTransaction =
  (transactionId) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${transactionId}`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(getSingleTransaction(data));
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

// ------------------------->

// Reducer here

const initialState = {
  allTransactions: {},
  singleTransaction: {},
};

export default function transactionReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_TRANSACTIONS:
      newState = { ...state };
      newState.allTransactions = {};
      action.payload.forEach((transaction) => {
        newState.allTransactions[transaction.id] = transaction;
      });
      return newState;
    case GET_SINGLE_TRANSACTION:
      newState = { ...state };
      newState.singleTransaction = { ...action.payload };
      return newState;
    default:
      return state;
  }
}
