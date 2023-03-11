import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllRooms, thunkGetAllUsers } from "../../store/rooms";
import ChatRoom from "./Room";
import "./ChatPage.css";
import Searchbar from "./Searchbar";

const Chat = () => {
  const user = useSelector((state) => state.session.user);
  const allUserObject = useSelector((state) => state.room.allUsers);
  const allRooms = useSelector((state) => state.room.rooms);
  const rooms = Object.values(allRooms);
  const existingUsers = new Set();
  rooms.forEach((room) => {
    existingUsers.add(room.friend_id);
    existingUsers.add(room.user_id);
  });
  const dispatch = useDispatch();

  const [selectedRoom, setSelectedRoom] = useState(0);

  useEffect(() => {
    dispatch(thunkGetAllRooms());
    dispatch(thunkGetAllUsers());
  }, []);

  if (!rooms) {
    return null;
  }

  return (
    <div className="chat-outer-container">
      <div className="chat-inner-container">
        <div className="direct-messages-container">
          <h1>Messages</h1>
          <Searchbar existingUsers={existingUsers} />
          {rooms?.map((room) => (
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
                      ? `${allUserObject[room.user_id]?.username}`
                      : `${allUserObject[room.friend_id]?.username}`}
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="chat-box-container">
          <ChatRoom selectedRoom={selectedRoom} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
