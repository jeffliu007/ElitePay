import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateTransaction } from "../../store/transactions";

function CreateTransactionForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allCards = useSelector((state) => state.cards.allCards);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [recipient_id, setRecipient] = useState(0);
  const [card_id, setCardId] = useState(0);

  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const body = {
      card_id,
      amount,
      description,
      recipient_id,
    };

    try {
      const res = await dispatch(thunkCreateTransaction(body));
      // const data = await res.json();

      closeModal();
      // history.push(`/transactions/${res.id}`);
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
        <label htmlFor="amount" className="Global-Modal-Label">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="Payment amount"
            className="Global-Modal-input"
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
          <input
            type="number"
            value={recipient_id}
            onChange={(e) => setRecipient(e.target.value)}
            required
            placeholder="Recipient ID"
            className="Global-Modal-input"
          />
        </label>
        <label htmlFor="card_id" className="Global-Modal-Label">
          <input
            type="number"
            value={card_id}
            onChange={(e) => setCardId(e.target.value)}
            required
            placeholder="Card ID"
            className="Global-Modal-input"
          />
        </label>
        <button type="submit" className="Global-SubmitButton">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

// {
//   /* <label htmlFor="card_id">Select a Card:</label>
// <select id="card_id" name="card_id" onChange={handleCardChange}>
//   <option value="">--Please select a card--</option>
//   {allCards.map((card) => (
//     <option key={card.id} value={card.id}>
//       {card.name} ({card.balance})
//     </option>
//   ))}
// </select> */
// }

export default CreateTransactionForm;
