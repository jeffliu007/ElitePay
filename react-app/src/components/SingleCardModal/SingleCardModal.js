import OpenModalButton from "../OpenModalButton";
import SingleCardContent from "./SingleCardContent";
import "./SingleCardPage.css";

const SingleCardModal = ({ card }) => {
  return (
    <div>
      <OpenModalButton
        buttonText=""
        modalComponent={<SingleCardContent card={card} />}
        className="SingleCard-Button"
      />
    </div>
  );
};

export default SingleCardModal;
