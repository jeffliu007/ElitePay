import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AllTransactionsPage.css";
import { useHistory } from "react-router-dom";
import {
  thunkGetAllTransactions,
  thunkDeleteTransaction,
} from "../../store/transactions";
import CreateTransactionModal from "../CreateTransactionModal/Index";

const AllTransactionsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loadedPage, setLoadedPage] = useState(false);
  const allTransactions = useSelector(
    (state) => state.transactions.allTransactions
  );
  const sessionUser = useSelector((state) => state.session);

  let allTransactionsArr = Object.values(allTransactions);

  useEffect(() => {
    dispatch(thunkGetAllTransactions()).then(() => setLoadedPage(true));
  }, [dispatch]);

  // const handleTransactionDelete = async (transactionId) => {
  //   await dispatch(thunkDeleteTransaction(transactionId));

  // };

  // send transaction id as prop and map all into a card

  if (!loadedPage) return null;

  return (
    <div className="AllTransactions-Main-Container">
      <h1>Dump all transaction info here</h1>
      {allTransactionsArr.map((transaction) => (
        <div key={transaction.id}>
          <div>transaction amount: ${transaction.amount}</div>
          <div>transaction created at: {transaction.created_at}</div>
          <div>transaction card_id : {transaction.card_id}</div>
          <div>transaction description: {transaction.description}</div>
          <div>transaction recipient_id: {transaction.recipient_id}</div>
          <div>transaction sender_id: {transaction.sender_id}</div>
          <div>transaction Id Num: {transaction.id} </div>
          <div>transaction status: {transaction.status}</div>
          {/* <button onClick={handleTransactionDelete(transaction.id)}>Delete transaction</button> */}
        </div>
      ))}
      <div className="AllTransaction-Create-Transaction">
        <CreateTransactionModal />
      </div>
    </div>
  );
};

export default AllTransactionsPage;
