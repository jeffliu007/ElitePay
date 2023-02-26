const GET_ALL_TRANSACTIONS = "transactions/get_all_transactions";
const GET_SINGLE_TRANSACTION = "transactions/get_single_transaction";
const CREATE_NEW_TRANSACTION = "transactions/create_new_transaction";
const UPDATE_TRANSACTION = "transactions/update_transaction";
const DELETE_TRANSACTION = "transactions/delete_transaction";
const ACCEPT_TRANSACTION = "transactions/accept_transaction";
const SET_TRANSACTION_ERRORS = "transactions/set_transaction_errors";

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

const setTransactionErrors = (errors) => ({
  type: SET_TRANSACTION_ERRORS,
  errors,
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

export const thunkCreateTransaction = (data) => async (dispatch) => {
  try {
    const response = await fetch("/api/transactions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to create transaction");
    }

    const newTransaction = await response.json();
    dispatch(createTransaction(newTransaction));
  } catch (error) {
    console.error(error);
    return ["An error occurred. Please try again."];
  }
};

// export const thunkCreateTransaction = (data) => async (dispatch) => {
//   const response = await fetch("/api/transactions/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((res) => {
//       return res.json();
//     })
//     .then((res) => dispatch(createTransaction(res)))
//     .catch((error) => dispatch(setTransactionErrors(error.errors)));
// };

export const thunkUpdateTransaction = (transaction, id) => async (dispatch) => {
  const response = await fetch(`/api/transactions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });
  if (response.ok) {
    const updatedTransaction = await response.json();
    dispatch(updateTransaction(updatedTransaction));
    return updatedTransaction;
  }
};

export const thunkDeleteTransaction = (transactionId) => async (dispatch) => {
  const response = await fetch(`/api/transactions/${transactionId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const deletedTransaction = await response.json();
    dispatch(deleteTransaction(transactionId));
    return deletedTransaction;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const thunkAcceptTransaction = (transactionId) => async (dispatch) => {
  try {
    const response = await fetch(
      `/api/transactions/${transactionId.transaction_id}/accept`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transaction_id: transactionId.transaction_id }),
      }
    );

    if (!response.ok) {
      const error = await response.text();

      throw new Error("Failed to accept transaction");
    }

    const acceptedTransaction = await response.json();

    dispatch(acceptTransaction(acceptedTransaction));
    return acceptedTransaction;
  } catch (error) {
    console.error(error);
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
    case CREATE_NEW_TRANSACTION:
      return {
        ...state,
        allTransactions: {
          ...state.allTransactions,
          [action.payload.id]: action.payload,
        },
      };
    case ACCEPT_TRANSACTION:
      newState = { ...state };
      const acceptedTransaction = action.payload;
      if (acceptedTransaction) {
        newState.allTransactions[acceptedTransaction.id] = acceptedTransaction;
      }
      break;
    case DELETE_TRANSACTION:
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    case UPDATE_TRANSACTION:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}
