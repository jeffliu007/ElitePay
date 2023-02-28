import OpenModalButton from "../OpenModalButton";
import UpdateCardForm from "./UpdateCardForm";

const UpdateCardModal = () => {
  return (
    <div>
      <OpenModalButton
        buttonText="Update Card"
        modalComponent={<UpdateCardForm />}
        className="SingleCard-Update-Button"
      />
    </div>
  );
};

export default UpdateCardModal;
