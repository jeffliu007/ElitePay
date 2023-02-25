import OpenModalButton from "../OpenModalButton";
import AcceptTransactionForm from "./AcceptTransactionForm";

const AcceptTransactionModal = () => {
  return (
    <div>
      <OpenModalButton
        buttonText="Accept a transaction"
        modalComponent={<AcceptTransactionForm />}
      />
    </div>
  );
};

export default AcceptTransactionModal;
