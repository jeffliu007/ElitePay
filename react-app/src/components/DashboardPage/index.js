import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DashboardPage.css";
import { NavLink, useHistory } from "react-router-dom";
import {
  thunkGetAllTransactions,
  thunkDeleteTransaction,
} from "../../store/transactions";
import CreateTransactionModal from "../CreateTransactionModal/Index";

const DashboardPage = () => {
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

  // return (
  //   <div className="AllTransactions-Main-Container">
  //     <h1>Dump all transaction info here</h1>
  //     {allTransactionsArr.map((transaction) => (
  //       <div key={transaction.id}>
  //         <div>transaction amount: ${transaction.amount}</div>
  //         <div>transaction created at: {transaction.created_at}</div>
  //         <div>transaction card_id : {transaction.card_id}</div>
  //         <div>transaction description: {transaction.description}</div>
  //         <div>transaction recipient_id: {transaction.recipient_id}</div>
  //         <div>transaction sender_id: {transaction.sender_id}</div>
  //         <div>transaction Id Num: {transaction.id} </div>
  //         <div>transaction status: {transaction.status}</div>
  //         {/* <button onClick={handleTransactionDelete(transaction.id)}>Delete transaction</button> */}
  //       </div>
  //     ))}
  //     <div className="AllTransaction-Create-Transaction">
  //       <CreateTransactionModal />
  //     </div>
  //   </div>
  // );

  return (
    <div className="AllTransactions-Main-Container">
      <div className="Second-Nav"> Second Navbar Holder</div>
      <div className="AllTransactions-Card-Holder">
        <div className="AllTransactions-Header">
          <div className="AllTransactions-Header-Item1">Transaction ID</div>
          <div className="AllTransactions-Header-Item2">Transaction Date</div>
          <div className="AllTransactions-Header-Item3">Transaction Amount</div>
        </div>

        {allTransactionsArr.map((transaction) => (
          <NavLink exact to={`dashboard/transactions/${transaction.id}`}>
            <div className="AllTransactions-Content">
              <img src={process.env.PUBLIC_URL + "/dollarsign.png"} />
              <div className="AllTransactions-Inner-Content">
                <div>Transaction #{transaction.id}</div>
                <div className="Date">
                  {" "}
                  {new Date(transaction.created_at).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="AllTransactions-Amount">
                  ${transaction.amount}
                </div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
      {/* <div className="AllTransaction-Create-Transaction">
        <CreateTransactionModal />
      </div> */}
    </div>
  );
};

export default DashboardPage;
