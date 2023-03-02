import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import "./SingleTransactionPage.css";
import {
  thunkGetSingleTransaction,
  thunkDeleteTransaction,
  thunkAcceptTransaction,
  thunkGetAllTransactions,
} from "../../store/transactions";
import UpdateTransactionModal from "../UpdateTransactionModal";
import { useModal } from "../../context/Modal";

const SingleTransactionContent = ({ transaction }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loadedPage, setLoadedPage] = useState(false);
  const [users, setUsers] = useState([]);
  const { closeModal } = useModal();

  const sessionUserId = useSelector((state) => state.session.user.id);

  let transactionId = transaction?.id;

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
    dispatch(thunkDeleteTransaction(transactionId)).then(() => {
      dispatch(thunkGetAllTransactions());
      closeModal();
    });
  };

  // ---> accept a transaction
  const handleAccept = async () => {
    const body = {
      transaction_id: transactionId,
    };

    try {
      const res = await dispatch(thunkAcceptTransaction(body));
      await dispatch(thunkGetAllTransactions());
      closeModal();
      history.push(`/dashboard`);
    } catch (error) {}
  };

  const recipientDisplayName = users.filter(
    (user) => user?.id == transaction?.recipient_id
  )[0]?.username;

  return (
    <div className="SingleTransaction-Main-Container">
      <div className="SingleTransaction-Top-Holder">
        <h2>Transaction #{transactionId}</h2>
        <p>Payment to {recipientDisplayName}</p>
        <div className="SingleTransaction-Div-Amount">
          ${transaction?.amount}
        </div>
        <div className="SingleTransaction-Div-Created-At">
          {new Date(transaction?.created_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <div className="SingleTransaction-Div-Description">
          Description: <br /> {transaction?.description}
        </div>
      </div>
      <div className="SingleTransaction-Bottom-Holder">
        <div className="SingleTransaction-Div">To: {recipientDisplayName}</div>
        {transaction?.sender_id == sessionUserId && (
          <div className="SingleTransaction-Div">
            From: You sent this transaction
          </div>
        )}
        <div className="SingleTransaction-Div">
          Status: {transaction?.status}
        </div>
        {transaction?.status !== "completed" &&
          sessionUserId == transaction?.recipient_id && (
            <div className="SingleTransaction-Accept" onClick={handleAccept}>
              Accept
            </div>
          )}
        <div className="SingleTransaction-Button-Holder">
          {transaction?.sender_id === sessionUserId ||
          transaction?.status === "completed" ? (
            <div
              className="SingleTransaction-Delete"
              onClick={handleTransactionDelete}
            >
              Delete
            </div>
          ) : null}

          {transaction?.status !== "completed" &&
            sessionUserId !== transaction?.recipient_id && (
              <UpdateTransactionModal />
            )}
        </div>
      </div>
    </div>
  );
};

export default SingleTransactionContent;
