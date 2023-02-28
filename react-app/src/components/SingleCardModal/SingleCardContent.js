import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import "./SingleCardPage.css";
import {
  thunkGetSingleCard,
  thunkDeleteCard,
  thunkGetAllCards,
} from "../../store/cards";
import UpdateCardModal from "../UpdateCardModal";
import { useModal } from "../../context/Modal";

const SingleCardContent = ({ card }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const singleCard = useSelector((state) => state.cards.singleCard);
  const sessionUser = useSelector((state) => state.session);
  const [loadedPage, setLoadedPage] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(thunkGetSingleCard(card?.id)).then(() => setLoadedPage(true));
  }, [dispatch, card?.id]);

  const handleCardDelete = async (e) => {
    e.preventDefault();
    await dispatch(thunkDeleteCard(card?.id));
    await dispatch(thunkGetAllCards());
    closeModal();
  };

  return (
    <div className="SingleCard-Container">
      <h1>dumping all single card info here</h1>
      <div className="SingleCard-TempInfo-Holder">
        <div>Single Card balance{card?.balance}</div>
        <div>Single Card created at{card?.created_at}</div>
        <div>Single Card cvc {card?.cvc_number}</div>
        <div>Single Card debit num {card?.debit_number}</div>
        <div>Single Card full name {card?.full_name}</div>
        <div>Single Card id {card?.id}</div>
      </div>
      <div className="Dashboard-Edit-Card">
        <UpdateCardModal user={sessionUser} />
      </div>
      <div className="Dashboard-Delete-Card" onClick={handleCardDelete}>
        Delete Card
      </div>
    </div>
  );
};

export default SingleCardContent;
