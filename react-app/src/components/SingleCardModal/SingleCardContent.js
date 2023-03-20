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
    <div className="Global-Modal-Container6">
      <h1>Card #{card?.id}</h1>
      <div className="SingleCard-Info-Holder">
        <div>Balance: ${card?.balance}</div>
        <div>
          Created at:{" "}
          {new Date(card.created_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <div>CVC #{card?.cvc_number}</div>
        <div>Debit #{card?.debit_number}</div>
        <div>Card Holder: {card?.full_name}</div>
      </div>
      <div className="SingleCard-Bottom-Info">
        <div className="Dashboard-Edit-Card">
          <UpdateCardModal user={sessionUser} />
        </div>
        <div className="SingleCard-Delete-Button" onClick={handleCardDelete}>
          Delete Card
        </div>
      </div>
    </div>
  );
};

export default SingleCardContent;
