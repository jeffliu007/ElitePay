import OpenModalButton from "../OpenModalButton";
import UpdateTransactionForm from "./UpdateTransactionForm";
import "./UpdateTransactionModal.css";

const UpdateTransactionModal = ({ transactionId }) => {
  return (
    <div>
      <OpenModalButton
        buttonText="Update Transaction"
        modalComponent={<UpdateTransactionForm transactionId={transactionId} />}
        className="Update-Transaction-Button"
      />
    </div>
  );
};

export default UpdateTransactionModal;
