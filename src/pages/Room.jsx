import {
  ArrowLeftStartOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Room = ({ username, room, socket }) => {
  const navigate = useNavigate();
  const [roomUsers, setRoomUsers] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [message, setMessage] = useState("");
  const boxDivRef = useRef(null);

  useEffect(() => {
    // Send joined user info to server
    socket.emit("joined_room", { username, room });

    // Get message from server
    socket.on("message", (data) => {
      setReceivedMessages((prev) => [...prev, data]);
    });

    // Get room users from sever
    socket.on("room_users", (data) => {
      let previousRoomUsers = [...roomUsers];
      data.forEach((user) => {
        const index = previousRoomUsers.findIndex(
          (prevUser) => prevUser.id === user.id,
        );

        if (index !== -1) {
          previousRoomUsers[index] = { ...previousRoomUsers[index], ...data };
        } else {
          previousRoomUsers.push(user);
        }

        setRoomUsers(previousRoomUsers);
      });
    });

    return () => socket.disconnect();
  }, [socket]);

  const sendMessage = () => {
    if (message.trim().length > 0) {
      socket.emit("message_send", message);
      setMessage("");
    }
  };

  const leaveRoom = () => {
    navigate("/");
  };

  useEffect(() => {
    if (boxDivRef.current) {
      boxDivRef.current.scrollTop = boxDivRef.current.scrollHeight;
    }
  }, [receivedMessages]);

  return (
    <section className="flex gap-4 bg-graphite">
      {/* left side */}
      <div className="w-1/3 h-screen bg-purple-blue text-white font-medium">
        <h1 className="text-3xl font-bold text-center mt-5">Chatterbox</h1>
        <div className="mt-10 ps-2">
          <h2 className="flex items-end gap-1 text-xl font-bold">
            <ChatBubbleLeftRightIcon width={30} />
            Box name
          </h2>
          <p className="bg-white text-purple-blue font-semibold ps-5 py-2 rounded-tl-full rounded-bl-full my-2">
            {room}
          </p>
        </div>
        <div className="mt-5 ps-2">
          <p className="flex items-end gap-1 text-xl mb-3 font-bold">
            <UserGroupIcon width={30} />
            Users
          </p>
          {roomUsers.map((user, i) => (
            <p className="flex items-end gap-1 text-lg my-2" key={i}>
              <UserIcon width={24} />
              {user.username === username ? "You" : user.username}
            </p>
          ))}
        </div>
        <button
          className="absolute bottom-0 p-2.5 flex items-center gap-1 w-full mb-2 text-lg"
          type="button"
          onClick={leaveRoom}
        >
          <ArrowLeftStartOnRectangleIcon width={30} />
          Leave room
        </button>
      </div>
      {/* right side */}
      <div className="w-full h-screen pt-5 relative text-white">
        <div className="h-[90%] overflow-y-auto" ref={boxDivRef}>
          {receivedMessages.map((msg, i) => (
            <div
              className="bg-purple-blue p-3 mb-3 w-3/4 rounded-br-3xl rounded-tl-3xl "
              key={i}
            >
              <p className="text-sm font-medium font-mono">
                From {msg.username}
              </p>
              <p className="text-lg font-semibold">{msg.message}</p>
              <p className="text-sm font-medium font-mono text-right">
                {formatDistanceToNow(new Date(msg.send_at))}
              </p>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 my-2 py-2.5 flex items-center w-full px-2">
          <input
            className="w-full outline-none bg-[rgb(65,65,65)] me-2 p-2 rounded-lg"
            type="text"
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="button" onClick={sendMessage}>
            <PaperAirplaneIcon
              className="hover:text-purple-blue hover:-rotate-45 duration-200"
              width={30}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Room;
