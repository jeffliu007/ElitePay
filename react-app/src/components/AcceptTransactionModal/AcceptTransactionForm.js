import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkAcceptTransaction } from "../../store/transactions";

function AcceptTransactionForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [transaction_id, setTransactionId] = useState(0);

  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const body = {
      transaction_id: parseInt(transaction_id),
    };

    try {
      const res = await dispatch(thunkAcceptTransaction(body));
      // const data = await res.json();

      closeModal();
      history.push(`/dashboard`);
      // history.go(0);
    } catch (error) {
      let errorObject = JSON.parse(error.message);
      const result = errorObject.errors.map((error) => {
        return error.split(": ")[1];
      });
      if (errorObject) setErrors(result);
    }
  };

  return (
    <div className="Global-Modal-Container">
      <img
        src={process.env.PUBLIC_URL + "/logo.png"}
        className="Global-Logo"
        alt="logo"
      />
      <div className="Global-Modal-Header">Add a new transaction</div>
      <form onSubmit={handleSubmit} className="Global-ModalForm-Container">
        <ul className="Global-Errors-UL">
          {errors.map((error, idx) => (
            <li key={idx} className="Global-Errors-LI">
              {error}
            </li>
          ))}
        </ul>
        <label htmlFor="transaction_id" className="Global-Modal-Label">
          <input
            type="number"
            value={transaction_id}
            onChange={(e) => setTransactionId(e.target.value)}
            required
            placeholder="Transaction_id"
            className="Global-Modal-input"
          />
        </label>
        <button type="submit" className="Global-SubmitButton">
          Accept Transaction
        </button>
      </form>
    </div>
  );
}

export default AcceptTransactionForm;
