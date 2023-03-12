const GET_ALL_ROOMS = "rooms/get_all_rooms";
const GET_ALL_USERS = "rooms/get_all_users";
const CREATE_NEW_ROOM = "rooms/create_new_room";

const getAllRooms = (rooms) => ({
  type: GET_ALL_ROOMS,
  payload: rooms,
});

const getAllUsers = (users) => ({
  type: GET_ALL_USERS,
  payload: users,
});

const createRoom = (room) => ({
  type: CREATE_NEW_ROOM,
  payload: room,
});

export const thunkGetAllRooms = () => async (dispatch) => {
  const response = await fetch("/api/users/room");

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllRooms(data.rooms));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const thunkGetAllUsers = () => async (dispatch) => {
  const response = await fetch(`/api/users/`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllUsers(data.users));
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const thunkCreateRoom = (data) => async (dispatch) => {
  const response = await fetch("/api/room/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createRoom(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  } else {
    return "An error occurred. Please try again.";
  }
};

const initialState = { rooms: {}, users: [], allUsers: {} };

export default function roomReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ROOMS:
      return {
        ...state,
        rooms: {
          ...action.payload,
        },
      };
    case GET_ALL_USERS:
      const userObject = {};
      action.payload.forEach((user) => (userObject[user.id] = user));
      return {
        ...state,
        users: [...action.payload],
        allUsers: {
          ...userObject,
        },
      };
    case CREATE_NEW_ROOM:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.payload.id]: action.room,
        },
      };
    default:
      return state;
  }
}
