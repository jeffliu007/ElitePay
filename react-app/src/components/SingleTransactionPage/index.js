import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import "./SingleTransactionPage.css";
import { thunkGetSingleTransaction } from "../../store/transactions";

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
  }, [dispatch]);

  return (
    <div className="SingleTransaction-Container">
      <h1>Dumping all single transaction info here</h1>
      <div className="SingleTransaction-Temp-Holder">
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
    </div>
  );
};

export default SingleTransactionPage;
