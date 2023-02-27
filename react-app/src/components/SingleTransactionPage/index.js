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

//!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!
// MISSING CONDITIONAL
// USER CAN CURRENTLY VIEW ANY SPECIFIC TRANSACTION
//EVEN IF THEY ARENT THE SENDER OR RECEIVER
//this can most likely be prevented by only allowing users to hit this route by clicking on navlinks
//to each card they own in the all cards route

const SingleTransactionPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loadedPage, setLoadedPage] = useState(false);

  const singleTransaction = useSelector(
    (state) => state.transactions.singleTransaction
  );
  const sessionUser = useSelector((state) => state.session);

  const { transactionId } = useParams();

  useEffect(() => {
    dispatch(thunkGetSingleTransaction(transactionId)).then(() =>
      setLoadedPage(true)
    );
  }, [dispatch, transactionId]);

  // -----> to delete a transaction
  const handleTransactionDelete = async (e) => {
    e.preventDefault();
    dispatch(thunkDeleteTransaction(transactionId)).then(() =>
      history.push("/dashboard/transactions")
    );
  };

  return (
    <div className="SingleTransaction-Main-Container">
      <div className="SingleTransaction-Content-Holder">
        <h2>Transaction</h2>
        <div>Single Transaction amount {singleTransaction.amount}</div>
        <div>Single Transaction card_id {singleTransaction.card_id}</div>
        <div>Single Transaction created_at {singleTransaction.created_at}</div>
        <div>
          Single Transaction description {singleTransaction.description}
        </div>
        <div>Single Transaction id {singleTransaction.id}</div>
        <div>
          Single Transaction recipient_id {singleTransaction.recipient_id}
        </div>
        <div>Single Transaction sender_id {singleTransaction.sender_id}</div>
        <div>Single Transaction status {singleTransaction.status}</div>
      </div>
      {/* <div
        className="AllTransaction-Delete-Transaction"
        onClick={handleTransactionDelete}
      >
        Delete Transaction
      </div>
      <div className="AllTransaction-Accept-Transaction">
        <AcceptTransactionModal />
      </div>
      <div className="AllTransaction-Update-Transaction">
        <UpdateTransactionModal />
      </div> */}
    </div>
  );
};

export default SingleTransactionPage;
