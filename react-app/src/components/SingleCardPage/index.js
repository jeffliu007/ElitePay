import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import "./SingleCardPage.css";
import { thunkGetSingleCard, thunkDeleteCard } from "../../store/cards";
import UpdateCardModal from "../UpdateCardModal";

const SingleCardPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const singleCard = useSelector((state) => state.cards.singleCard);
  const sessionUser = useSelector((state) => state.session);
  const [loadedPage, setLoadedPage] = useState(false);

  const { cardId } = useParams();

  useEffect(() => {
    dispatch(thunkGetSingleCard(cardId)).then(() => setLoadedPage(true));
  }, [dispatch, cardId]);

  const handleCardDelete = async (e) => {
    e.preventDefault();
    dispatch(thunkDeleteCard(cardId)).then(() => history.push("/dashboard"));
  };

  return (
    <div className="SingleCard-Container">
      <h1>dumping all single card info here</h1>
      <div className="SingleCard-TempInfo-Holder">
        <div>Single Card balance{singleCard.balance}</div>
        <div>Single Card created at{singleCard.created_at}</div>
        <div>Single Card cvc {singleCard.cvc_number}</div>
        <div>Single Card debit num {singleCard.debit_number}</div>
        <div>Single Card full name {singleCard.full_name}</div>
        <div>Single Card id {singleCard.id}</div>
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

export default SingleCardPage;
