import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  thunkUpdateTransaction,
  thunkGetAllTransactions,
  thunkGetSingleTransaction,
} from "../../store/transactions";
import { thunkGetAllCards } from "../../store/cards";

function UpdateTransactionForm() {
  const dispatch = useDispatch();
  const singleTransaction = useSelector(
    (state) => state.transactions.singleTransaction
  );
  const allCards = useSelector((state) => state.cards.allCards);
  let allCardsArr = Object.values(allCards);
  const sessionUserId = useSelector((state) => state.session.user.id);
  const [amount, setAmount] = useState(singleTransaction.amount);
  const [description, setDescription] = useState(singleTransaction.description);
  const [recipient_id, setRecipient] = useState(singleTransaction.recipient_id);
  const [card_id, setCardId] = useState(singleTransaction.card_id);
  const [users, setUsers] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const { closeModal } = useModal();

  const validateSubmission = () => {
    const errors = [];
    if (amount <= 0) {
      errors.push("Amount must be greater than 0");
    }
    if (description.length > 70) {
      errors.push("Description must be shorter than 70 characters long");
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateSubmission();
    const selectedCard = allCards[card_id];
    if (selectedCard && parseFloat(amount) > parseFloat(selectedCard.balance)) {
      errors.push("Insufficient balance");
    }
    setValidationErrors(errors);
    if (errors.length === 0) {
      const body = {
        card_id,
        amount,
        description,
        recipient_id,
      };
      const transaction_id = singleTransaction.id;
      dispatch(thunkUpdateTransaction(body, transaction_id))
        .then(() => {
          dispatch(thunkGetAllTransactions());

          closeModal();
        })
        .catch((err) => {
          setValidationErrors([err.message]);
        });
    }
  };

  useEffect(() => {
    dispatch(thunkGetAllCards());
    dispatch(thunkGetSingleTransaction(singleTransaction.id));
    if (!users.length) {
      async function fetchData() {
        const response = await fetch(`/api/users/`);
        const responseData = await response.json();
        setUsers(responseData.users);
      }
      fetchData();
    }
  }, [users, singleTransaction.id, dispatch]);

  const otherUsers = users?.filter((user) => user.id !== sessionUserId);

  return (
    <div className="Global-Modal-Container3">
      <img
        src={process.env.PUBLIC_URL + "/logo.png"}
        className="Global-Logo"
        alt="logo"
      />
      <div className="Global-Modal-Header">Update a transaction</div>
      <form onSubmit={handleSubmit} className="Global-ModalForm-Container">
        <ul className="Global-Errors-UL">
          {validationErrors.map((error, idx) => (
            <li key={idx} className="Global-Errors-LI">
              {error}
            </li>
          ))}
        </ul>
        <label htmlFor="amount" className="Global-Modal-Label">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="Payment amount"
            className="Global-Modal-input"
            min={1}
          />
        </label>
        <label htmlFor="description" className="Global-Modal-Label">
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Description"
            className="Global-Modal-input"
          ></textarea>
        </label>
        <label htmlFor="recipient_id" className="Global-Modal-Label">
          <select
            type="number"
            value={recipient_id}
            onChange={(e) => setRecipient(e.target.value)}
            required
            className="Global-Modal-input"
          >
            <option value="">--Please select a recipient--</option>
            {otherUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="card_id" className="Global-Modal-Label">
          <select
            id="card_id"
            value={card_id}
            onChange={(e) => setCardId(e.target.value)}
            required
            className="Global-Modal-input"
          >
            <option value="">--Please select a card--</option>
            {allCardsArr.map((card) => (
              <option key={card.id} value={card.id}>
                Card ID: {card.id} / Balance: ${card.balance}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="Global-SubmitButton">
          Update Transaction
        </button>
      </form>
    </div>
  );
}

export default UpdateTransactionForm;
