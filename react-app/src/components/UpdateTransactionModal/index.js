import OpenModalButton from "../OpenModalButton";
import UpdateTransactionForm from "./UpdateTransactionForm";

const UpdateTransactionModal = ({ transactionId }) => {
  return (
    <div>
      <OpenModalButton
        buttonText="Update a transaction"
        modalComponent={<UpdateTransactionForm transactionId={transactionId} />}
      />
    </div>
  );
};

export default UpdateTransactionModal;
