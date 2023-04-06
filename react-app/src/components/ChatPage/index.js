import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllRooms, thunkGetAllUsers } from "../../store/rooms";
import ChatRoom from "./Room";
import React from "react";
import "./ChatPage.css";
import Searchbar from "./Searchbar";

const Chat = () => {
  const user = useSelector((state) => state.session.user);
  const allUserObject = useSelector((state) => state.room.allUsers);
  const allRooms = useSelector((state) => state.room.rooms);
  const rooms = Object.values(allRooms);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const existingUsers = new Set();
  rooms.forEach((room) => {
    existingUsers.add(room?.friend_id);
    existingUsers.add(room?.user_id);
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetAllRooms());
    dispatch(thunkGetAllUsers());
  }, [dispatch]);

  if (!rooms || !allUserObject) {
    return null;
  }

  return (
    <div className="Chat-Outer-Container">
      <div className="Chat-Inner-Container">
        <div className="Message-Container">
          <h1>Messages</h1>
          <Searchbar existingUsers={existingUsers} />
          {rooms?.map((room) => (
            <React.Fragment key={`room-${room?.id}-fragment`}>
              <div
                className="Room-User-Container"
                key={`room-${room?.id}`}
                id={room?.id}
                onClick={() => setSelectedRoom(room?.id)}
              >
                <div className="Room-User">
                  <div className="Room-User-Icon">
                    <i class="fa-regular fa-user"></i>
                  </div>
                  <p>
                    {room?.friend_id === user?.id
                      ? allUserObject?.[room?.user_id]?.username &&
                        `${allUserObject?.[room?.user_id]?.username}`
                      : allUserObject?.[room?.friend_id]?.username &&
                        `${allUserObject?.[room?.friend_id]?.username}`}
                  </p>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="Chat-Box-Container">
          <ChatRoom selectedRoom={selectedRoom} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
