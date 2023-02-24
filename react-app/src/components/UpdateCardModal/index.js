import OpenModalButton from "../OpenModalButton";
import UpdateCardForm from "./UpdateCardForm";

const UpdateCardModal = () => {
  return (
    <div>
      <OpenModalButton
        buttonText="Update a card"
        modalComponent={<UpdateCardForm />}
      />
    </div>
  );
};

export default UpdateCardModal;
