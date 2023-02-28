import OpenModalButton from "../OpenModalButton";
import SingleTransactionContent from "./SingleTransactionContent";
import "./SingleTransactionPage.css";

const SingleTransactionModal = ({ transaction }) => {
  return (
    <div>
      <OpenModalButton
        buttonText=""
        modalComponent={<SingleTransactionContent transaction={transaction} />}
        className="SingleTransaction-Button"
      />
    </div>
  );
};

export default SingleTransactionModal;
