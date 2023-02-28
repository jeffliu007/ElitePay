import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkGetAllCards, thunkUpdateCard } from "../../store/cards";

function UpdateCardForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const card = useSelector((state) => state.cards.singleCard);

  const [full_name, setFullname] = useState(card.full_name);
  const [debit_number, set_Debit] = useState(card.debit_number);
  const [cvc_number, set_Cvc] = useState(card.cvc_number);
  const [balance, set_Balance] = useState(card.balance);
  const [validationErrors, setValidationErrors] = useState([]);
  const { closeModal } = useModal();

  const validateSubmission = () => {
    const errors = [];
    if (full_name.length < 3 || full_name.length > 50) {
      errors.push("Name must be within 3 to 50 characters long");
    }
    if (debit_number.length !== 16) {
      errors.push("Debit number must be exactly 16 digits long");
    }
    if (cvc_number.length !== 3) {
      errors.push("CVC number must be exactly 3 digits long");
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateSubmission();
    setValidationErrors(errors);
    if (errors.length === 0) {
      const body = {
        full_name,
        debit_number,
        cvc_number,
        balance,
        id: card.id,
      };
      dispatch(thunkUpdateCard(body))
        .then(() => {
          closeModal();
        })
        .then(() => {
          dispatch(thunkGetAllCards());
        })
        .catch((err) => {
          setValidationErrors([err.message]);
        });
    }
  };

  const generateRandomDebitNumber = () => {
    const randomNumber = Math.floor(
      1000000000000000 + Math.random() * 9000000000000000
    );
    set_Debit(randomNumber.toString());
  };

  const generateRandomCvcNumber = () => {
    const randomNumber = Math.floor(100 + Math.random() * 900);
    set_Cvc(randomNumber.toString());
  };

  return (
    <div className="Global-Modal-Container">
      <img
        src={process.env.PUBLIC_URL + "/logo.png"}
        className="Global-Logo"
        alt="logo"
      />
      <div className="Global-Modal-Header">Update card</div>
      <form onSubmit={handleSubmit} className="Global-ModalForm-Container">
        <ul className="Global-Errors-UL">
          {validationErrors.map((error, idx) => (
            <li key={idx} className="Global-Errors-LI">
              {error}
            </li>
          ))}
        </ul>
        <label htmlFor="full_name" className="Global-Modal-Label">
          <input
            type="text"
            value={full_name}
            onChange={(e) => setFullname(e.target.value)}
            required
            placeholder="Full name"
            className="Global-Modal-input"
          />
        </label>
        <label htmlFor="debit_number" className="Global-Modal-Label">
          <input
            type="text"
            value={debit_number}
            readOnly
            placeholder="Debit Number"
            className="Global-Modal-input"
          />
          <button type="button" onClick={generateRandomDebitNumber}>
            Generate Debit Number
          </button>
        </label>
        <label htmlFor="cvc-number" className="Global-Modal-Label">
          <input
            type="text"
            value={cvc_number}
            onChange={(e) => set_Cvc(e.target.value)}
            required
            readOnly
            placeholder="CVC"
            className="Global-Modal-input"
          />
        </label>
        <button type="button" onClick={generateRandomCvcNumber}>
          Generate CVC Number
        </button>
        <label htmlFor="balance" className="Global-Modal-Label">
          <input
            type="number"
            value={balance}
            onChange={(e) => set_Balance(parseFloat(e.target.value))}
            required
            placeholder="Balance"
            className="Global-Modal-input"
            min="1"
          />
        </label>
        <button type="submit" className="Global-SubmitButton">
          Update Card
        </button>
      </form>
    </div>
  );
}

export default UpdateCardForm;
