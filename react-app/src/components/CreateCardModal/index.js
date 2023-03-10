import OpenModalButton from "../OpenModalButton";
import CreateCardForm from "./CreateCardForm";
import "./CreateCardModal.css";

const CreateCardModal = () => {
  return (
    <div>
      <OpenModalButton
        buttonText="Add card"
        modalComponent={<CreateCardForm />}
        className="createCard-Button"
      />
    </div>
  );
};

export default CreateCardModal;
