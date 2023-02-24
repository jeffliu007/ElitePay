import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllCards } from "../../store/cards";
import CreateCardModal from "../CreateCardModal";
import UpdateCardModal from "../UpdateCardModal";

import "./DashboardPage.css";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const [loadedPage, setLoadedPage] = useState(false);
  const allCards = useSelector((state) => state.cards.allCards);
  const sessionUser = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(thunkGetAllCards()).then(() => setLoadedPage(true));
  }, [dispatch]);

  let allCardsArr = Object.values(allCards);
  // allCardsArr.forEach((card) => {
  //   console.log(card.balance);
  // });

  if (!loadedPage) return null;

  return (
    <div className="Dashboard-Main-Container">
      <div className="Dashboard-AllCards-Holder">
        <h1>dumping all cards info here</h1>
        {allCardsArr.map((card) => (
          <div key={card.id}>
            <div>Card balances: ${card.balance}</div>
            <div>Card created at: {card.created_at}</div>
            <div>Card CVC: {card.cvc_number}</div>
            <div>Card number: {card.debit_number}</div>
            <div>Card Full Name: {card.full_name}</div>
            <div>Card Id Num: {card.id} </div>
          </div>
        ))}
      </div>
      <div className="Dashboard-Create-Card">
        <CreateCardModal user={sessionUser} />
      </div>
    </div>
  );
};

export default DashboardPage;
