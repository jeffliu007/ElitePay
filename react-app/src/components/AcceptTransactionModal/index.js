import OpenModalButton from "../OpenModalButton";
import AcceptTransactionForm from "./AcceptTransactionForm";

const AcceptTransactionModal = ({ transactionId }) => {
  return (
    <div>
      <OpenModalButton
        buttonText="Accept a transaction"
        modalComponent={<AcceptTransactionForm transactionId={transactionId} />}
        className="Accept-Transaction-Button"
      />
    </div>
  );
};

export default AcceptTransactionModal;
