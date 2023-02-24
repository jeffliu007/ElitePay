import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AllTransactionsPage.css";

const AllTransactionsPage = () => {
  const dispatch = useDispatch();

  const [loadedPage, setLoadedPage] = useState(false);
  const allCards = useSelector((state) => state.cards.allCards);
  const sessionUser = useSelector((state) => state.session);

  // if (!loadedPage) return null;

  return (
    <div className="AllTransactions-Main-Container">
      <h1>Dump all transaction info here</h1>
    </div>
  );
};

export default AllTransactionsPage;
