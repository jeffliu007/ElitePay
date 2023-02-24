const GET_ALL_CARDS = "cards/get_all_cards";
const GET_SINGLE_CARD = "cards/get_single_card";
const CREATE_NEW_CARD = "cards/create_new_card";
const UPDATE_CARD = "cards/update_card";
const DELETE_CARD = "cards/delete_card";

// ------------------------->

// Action creators here
const getAllCards = (cards) => ({
  type: GET_ALL_CARDS,
  payload: cards,
});

const getSingleCard = (card) => ({
  type: GET_SINGLE_CARD,
  payload: card,
});

const createCard = (data) => ({
  type: CREATE_NEW_CARD,
  payload: data,
});

const updateCard = (card) => ({
  type: UPDATE_CARD,
  payload: card,
});

const deleteCard = (cardId) => ({
  type: DELETE_CARD,
  payload: cardId,
});

// ------------------------->

// Card feature thunks here
export const thunkGetAllCards = () => async (dispatch) => {
  const response = await fetch("/api/cards/", {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllCards(data.allCards));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const thunkGetSingleCard = (cardId) => async (dispatch) => {
  const response = await fetch(`/api/cards/${cardId}`, {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getSingleCard(data));
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const thunkCreateCard = (data) => async (dispatch) => {
  try {
    const response = await fetch("/api/cards/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create card");
    }

    const newCard = await response.json();
    dispatch(createCard(newCard));
  } catch (error) {
    console.error(error);
    return ["An error occurred. Please try again."];
  }
};

export const thunkUpdateCard = (card) => async (dispatch) => {
  const response = await fetch(`/api/cards/${card.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });

  if (response.ok) {
    const editedCard = await response.json();
    dispatch(updateCard(editedCard));
    return editedCard; // return response object
  } else if (response.status < 500) {
    const data = await response.json();
    throw new Error(JSON.stringify(data));
  }
};

export const thunkDeleteCard = (cardId) => async (dispatch) => {
  const response = await fetch(`/api/cards/${cardId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const deletedCard = await response.json();
    dispatch(deleteCard(cardId));
    return deletedCard;
  }
};

// ------------------------->

// Reducer here

const initialState = {
  allCards: {},
  singleCard: {},
};

export default function cardReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_CARDS:
      newState = { ...state };
      newState.allCards = {};
      action.payload.forEach((card) => {
        newState.allCards[card.id] = card;
      });
      return newState;
    case GET_SINGLE_CARD:
      newState = { ...state };
      newState.singleCard = { ...action.payload };
      return newState;
    case CREATE_NEW_CARD:
      return {
        ...state,
        allCards: {
          ...state.allCards,
          [action.payload.id]: action.payload,
        },
      };
    case UPDATE_CARD:
      newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    case DELETE_CARD:
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
