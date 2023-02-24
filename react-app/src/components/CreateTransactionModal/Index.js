import OpenModalButton from "../OpenModalButton";
import CreateTransactionForm from "./CreateTransactionForm";

const CreateTransactionModal = () => {
  return (
    <div>
      <OpenModalButton
        buttonText="Add a transaction"
        modalComponent={<CreateTransactionForm />}
      />
    </div>
  );
};

export default CreateTransactionModal;
