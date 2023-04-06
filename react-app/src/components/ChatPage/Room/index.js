import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRoomChats, thunkCreateChat } from "../../../store/chats";
import "./Room.css";

import { io } from "socket.io-client";

let socket;

const ChatRoom = ({ selectedRoom }) => {
  const dispatch = useDispatch();

  const chats = useSelector((state) => state.chat);
  const chatArr = Object.values(chats);

  const user = useSelector((state) => state.session.user);
  const allUsers = useSelector((state) => state.room.allUsers);

  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    socket = io();
    socket.emit("join", { room: selectedRoom });
    socket.on("chat", (chat) => {
      dispatch(getRoomChats(selectedRoom));
    });

    return () => {
      socket.emit("leave", { room: selectedRoom });
      socket.disconnect();
    };
  }, [selectedRoom, dispatch]);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    let timestamp = "";
    const newTime = new Date();
    const datestamp = newTime.toLocaleDateString();
    const time = newTime.toLocaleTimeString().split(" ");
    const hourMin = time[0].split(":");
    timestamp +=
      datestamp +
      " at " +
      hourMin[0] +
      ":" +
      hourMin[1] +
      time[1].toLowerCase();
    socket.emit("chat", {
      user: user,
      room: selectedRoom,
      msg: chatInput,
      created_at: timestamp,
    });
    dispatch(
      thunkCreateChat({
        room_id: selectedRoom,
        message: chatInput,
        created_at: timestamp,
      })
    );
    setChatInput("");
  };

  const scroll = () => {
    const chatContainer = document.querySelector(".Chats-Messages-Container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    dispatch(getRoomChats(selectedRoom));
    scroll();
  }, [selectedRoom, dispatch]);

  return (
    <>
      <div className="Chat-Messages-Container">
        {chatArr.map((chat, ind) => (
          <div
            className="Message-Bubble right"
            key={`${chat.message}-${chat.id}-${ind}`}
          >
            <div
              className={`Left-Message-Bubble-Icon ${
                chat.user_id === user.id ? "self" : ""
              }`}
            >
              <div>{`${allUsers[chat.user_id]?.username
                .charAt(0)
                .toUpperCase()}`}</div>
            </div>
            <div className="Right-Message-Bubble-Icon">
              <p>
                {`${allUsers[chat.user_id]?.username}`}
                <span>{chat.created_at}</span>
              </p>
              <p>{chat.message}</p>
            </div>
          </div>
        ))}
      </div>
      <form
        className={`Chat-Input-Container ${
          selectedRoom === 0 ? " disabled" : ""
        }`}
        onSubmit={sendChat}
      >
        <input value={chatInput} onChange={updateChatInput} />
        <button
          type="submit"
          className={`${selectedRoom === 0 ? " disabled" : ""}`}
        >
          <i className="fa-solid fa-reply"></i>
        </button>
      </form>
    </>
  );
};

export default ChatRoom;
