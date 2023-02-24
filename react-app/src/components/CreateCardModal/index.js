import OpenModalButton from "../OpenModalButton";
import CreateCardForm from "./CreateCardForm";

const CreateCardModal = () => {
  return (
    <div>
      <OpenModalButton
        buttonText="Add a card"
        modalComponent={<CreateCardForm />}
      />
    </div>
  );
};

export default CreateCardModal;
