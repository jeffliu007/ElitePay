import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateCard } from "../../store/cards";

function CreateCardForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [full_name, setFullname] = useState("");
  const [debit_number, set_Debit] = useState("");
  const [cvc_number, set_Cvc] = useState("");
  const [balance, set_Balance] = useState(0.0);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const body = {
      full_name,
      debit_number,
      cvc_number,
      balance,
    };

    try {
      const res = await dispatch(thunkCreateCard(body));
      // const data = await res.json();

      closeModal();
      // history.push(`/cards/${res.id}`);
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
      <div className="Global-Modal-Header">Add a new card</div>
      <form onSubmit={handleSubmit} className="Global-ModalForm-Container">
        <ul className="Global-Errors-UL">
          {errors.map((error, idx) => (
            <li key={idx} className="Global-Errors-LI">
              {error}
            </li>
          ))}
        </ul>
        <label for="full_name" className="Global-Modal-Label">
          <input
            type="text"
            value={full_name}
            onChange={(e) => setFullname(e.target.value)}
            required
            placeholder="Full name"
            className="Global-Modal-input"
          />
        </label>
        <label for="debit_number" className="Global-Modal-Label">
          <textarea
            type="text"
            value={debit_number}
            onChange={(e) => set_Debit(e.target.value)}
            required
            placeholder="Debit Number"
            className="Global-Modal-input"
          ></textarea>
        </label>
        <label for="cvc-number" className="Global-Modal-Label">
          <input
            type="text"
            value={cvc_number}
            onChange={(e) => set_Cvc(e.target.value)}
            required
            placeholder="CVC"
            className="Global-Modal-input"
          />
        </label>
        <label for="balance" className="Global-Modal-Label">
          <input
            type="number"
            value={balance}
            onChange={(e) => set_Balance(parseFloat(e.target.value))}
            required
            placeholder="Balance"
            className="Global-Modal-input"
          />
        </label>
        <button type="submit" className="Global-SubmitButton">
          Add Card
        </button>
      </form>
    </div>
  );
}

export default CreateCardForm;
