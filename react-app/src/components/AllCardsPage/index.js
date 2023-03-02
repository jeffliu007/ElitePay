import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllCards } from "../../store/cards";
import { NavLink, useHistory } from "react-router-dom";
import SingleCardModal from "../SingleCardModal/SingleCardModal";

import "./AllCardsPage.css";

const AllCardsPage = () => {
  const dispatch = useDispatch();

  const [loadedPage, setLoadedPage] = useState(false);
  const allCards = useSelector((state) => state.cards.allCards);
  const sessionUser = useSelector((state) => state.session);
  const history = useHistory();

  const handleBack = () => {
    history.push("/dashboard");
  };

  useEffect(() => {
    dispatch(thunkGetAllCards()).then(() => setLoadedPage(true));
  }, [dispatch]);

  let allCardsArr = Object.values(allCards);

  let totalBalance = 0;
  allCardsArr.forEach((card) => {
    totalBalance += card.balance;
  });

  if (!loadedPage) return null;

  return (
    <div className="AllCards-Main-Container">
      <div className="AllCards-Back-Button" onClick={handleBack}>
        {" "}
        {"<--"} Back to All Transactions
      </div>
      <div className="AllCards-Header">
        <h1>Current Active Cards</h1>
        <div className="AllCards-Total-Balance">
          Total Balance: ${totalBalance.toLocaleString()}
        </div>
      </div>
      <div className="AllCards-Card-Container">
        <div className="AllCards-Card-Holder">
          {allCardsArr.map((card) => (
            <div className="AllCards-Content" key={card.id}>
              <SingleCardModal card={card} />
              <div>Balance: ${card.balance.toLocaleString()}</div>
              <div>Created at: {card.created_at}</div>
              <div>CVC: {card.cvc_number}</div>
              <div>Debit #: {card.debit_number}</div>
              <div>Full Name: {card.full_name}</div>
              <div>Card ID #: {card.id} </div>
              <img
                src={process.env.PUBLIC_URL + "/singleCard.png"}
                className="singleCard-img"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCardsPage;
