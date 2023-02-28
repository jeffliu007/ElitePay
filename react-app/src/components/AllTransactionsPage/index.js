import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AllTransactionsPage.css";
import { NavLink, useHistory } from "react-router-dom";
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

  if (!loadedPage) return null;

  return (
    <div className="AllTransactions-Main-Container">
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
    </div>
  );
};

export default AllTransactionsPage;
