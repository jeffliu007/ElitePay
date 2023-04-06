import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DashboardPage.css";
import { thunkGetAllTransactions } from "../../store/transactions";
import SingleTransactionModal from "../SingleTransactionPage/SingleTransactionModal";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const [loadedPage, setLoadedPage] = useState(false);
  const allTransactions = useSelector(
    (state) => state.transactions.allTransactions
  );
  // const sessionUser = useSelector((state) => state.session);

  let allTransactionsArr = Object.values(allTransactions);

  useEffect(() => {
    dispatch(thunkGetAllTransactions()).then(() => setLoadedPage(true));
  }, [dispatch]);

  if (!loadedPage) return null;

  return (
    <div className="AllTransactions-Main-Container">
      <div className="AllTransactions-Card-Holder">
        <div className="AllTransactions-Header">
          <div className="AllTransactions-Header-Item1">Transaction ID</div>
          <div className="AllTransactions-Header-Item2">Transaction Date</div>
          <div className="AllTransactions-Header-Item3">Transaction Amount</div>
          <div className="AllTransactions-Header-Item4">Status</div>
        </div>
        {allTransactionsArr.length > 0 ? (
          allTransactionsArr.map((transaction) => (
            <div className="AllTransactions-Content">
              <SingleTransactionModal transaction={transaction} />
              <img
                src={process.env.PUBLIC_URL + "/dollarsign.png"}
                alt="dollarsign"
              />
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
                <div
                  className={
                    transaction?.status !== "completed"
                      ? "AllTransactions-Status"
                      : "AllTransactions-Status-Green"
                  }
                >
                  {transaction.status}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="No-Transactions-Container">
            <h1 className="No-Transactions">
              {""} No transactions made. Create a card and make your first
              transaction!
            </h1>
            <img
              src={process.env.PUBLIC_URL + "./noTransactions.png"}
              className="No-Transactions-Img"
              alt="noTX"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
