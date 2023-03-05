import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllRooms, thunkGetAllUsers } from "../../store/rooms";
import Searchbar from "./Searchbar";
import "./ChatPage.css";

export const ChatPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const allRooms = useSelector((state) => state.room.rooms);
  const allRoomsArr = Object.values(allRooms);
  const allUsers = useSelector((state) => state.room.allUsers);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const matchUsers = new Set();
  allRoomsArr.forEach((room) => {
    matchUsers.add(room.friend_id);
    matchUsers.add(room.user_id);
  });

  useEffect(() => {
    dispatch(thunkGetAllRooms());
    dispatch(thunkGetAllUsers());
  }, []);

  if (!allRoomsArr || !allUsers) {
    return null;
  }

  return (
    <div className="Chat-Main-Container">
      <div className="Chat-Left">
        <h1>Chat</h1>
        <Searchbar matchUsers={matchUsers} />
        {allRoomsArr?.map((room) => (
          <>
            <div
              className="room-person-container"
              key={`room-${room.id}`}
              id={room.id}
              onClick={() => setSelectedRoom(room.id)}
            >
              <div className="room-person">
                <div className="room-person-icon">
                  <h3>ICON</h3>
                </div>
                <p>
                  {room.friend_id === user?.id
                    ? `${allUsers[room.user_id]?.username}`
                    : `${allUsers[room.friend_id]?.username}`}
                </p>
              </div>
            </div>
          </>
        ))}
      </div>

      <div className="Chat-Right">right side</div>
    </div>
  );
};

export default ChatPage;
