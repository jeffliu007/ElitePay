const GET_ALL_CHATS = "chats/get_all_chats";
const CREATE_NEW_CHAT = "chats/create_new_chat";

const getAllChats = (chats) => {
  return {
    type: GET_ALL_CHATS,
    chats,
  };
};

const createChat = (chat) => {
  return {
    type: CREATE_NEW_CHAT,
    chat,
  };
};

export const getRoomChats = (roomId) => async (dispatch) => {
  if (roomId === 0) {
    // Return an error or do something else to handle the invalid roomId
    return "Room 0 doesnt exist";
  }

  const response = await fetch(`/api/room/${roomId}/chats`);
  if (response.ok) {
    const room = await response.json();
    dispatch(getAllChats(room.chats));
  }
};

export const thunkCreateChat = (payload) => async (dispatch) => {
  const response = await fetch(`/api/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createChat(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    console.log(data);
    if (data.errors) {
      return data.errors;
    }
  } else {
    return "An error occurred. Please try again.";
  }
};

const initialState = {};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHATS:
      const chatObjects = Object.values(action.chats);
      const chats = {};
      chatObjects.forEach((chat) => (chats[chat.id] = chat));
      return {
        ...chats,
      };
    case CREATE_NEW_CHAT:
      return {
        ...state,
        [action.chat.id]: action.chat,
      };
    default:
      return state;
  }
};

export default chatReducer;
