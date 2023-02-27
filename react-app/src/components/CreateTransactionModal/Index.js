import OpenModalButton from "../OpenModalButton";
import CreateTransactionForm from "./CreateTransactionForm";
import "./CreateTransactionModal.css";

const CreateTransactionModal = () => {
  return (
    <div>
      <OpenModalButton
        buttonText="Transact"
        modalComponent={<CreateTransactionForm />}
        className="Create-Transaction-Modal-Button"
      />
    </div>
  );
};

export default CreateTransactionModal;
