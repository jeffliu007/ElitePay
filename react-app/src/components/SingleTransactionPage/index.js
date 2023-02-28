import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import "./SingleTransactionPage.css";
import {
  thunkGetSingleTransaction,
  thunkDeleteTransaction,
} from "../../store/transactions";
import AcceptTransactionModal from "../AcceptTransactionModal";
import UpdateTransactionModal from "../UpdateTransactionModal";

const SingleTransactionPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loadedPage, setLoadedPage] = useState(false);
  const [users, setUsers] = useState([]);

  const singleTransaction = useSelector(
    (state) => state.transactions.singleTransaction
  );
  const sessionUserId = useSelector((state) => state.session.user.id);

  const { transactionId } = useParams();

  useEffect(() => {
    dispatch(thunkGetSingleTransaction(transactionId)).then(() =>
      setLoadedPage(true)
    );
    if (!users.length) {
      async function fetchData() {
        const response = await fetch(`/api/users/`);
        const responseData = await response.json();
        setUsers(responseData.users);
      }
      fetchData();
    }
  }, [dispatch, transactionId, users.length]);

  // -----> to delete a transaction
  const handleTransactionDelete = async (e) => {
    e.preventDefault();
    dispatch(thunkDeleteTransaction(transactionId)).then(() =>
      history.push("/dashboard")
    );
  };

  const recipientDisplayName = users.filter(
    (user) => user?.id == singleTransaction?.recipient_id
  )[0]?.username;

  return (
    <div className="SingleTransaction-Main-Container">
      <div className="SingleTransaction-Content-Holder">
        <h1>Transaction #{transactionId}</h1>
        <div className="SingleTransaction-Div">
          Amount: ${singleTransaction.amount}
        </div>
        <div className="SingleTransaction-Div">
          Created At:{" "}
          {new Date(singleTransaction.created_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <div className="SingleTransaction-Div">
          Description: {singleTransaction.description}
        </div>
        <div className="SingleTransaction-Div">
          Receiver Username: {recipientDisplayName}
        </div>
        {singleTransaction.sender_id == sessionUserId && (
          <div className="SingleTransaction-Div">
            Sender: You sent this transaction
          </div>
        )}
        <div className="SingleTransaction-Div">
          Status: {singleTransaction.status}
        </div>
        {singleTransaction.status !== "completed" &&
          sessionUserId == singleTransaction.recipient_id && (
            <div className="SingleTransaction-Accept-Transaction">
              <AcceptTransactionModal transactionId={transactionId} />
            </div>
          )}
        <div className="SingleTransaction-Button-Holder">
          {singleTransaction.sender_id === sessionUserId ||
          singleTransaction.status === "completed" ? (
            <div
              className="SingleTransaction-Delete-Transaction"
              onClick={handleTransactionDelete}
            >
              Delete Transaction
            </div>
          ) : null}

          {singleTransaction.status !== "completed" &&
            sessionUserId !== singleTransaction.recipient_id && (
              <div className="SingleTransaction-Update-Transaction">
                <UpdateTransactionModal />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SingleTransactionPage;
