import {
  ArrowLeftStartOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const Room = ({ username, room, socket }) => {
  const [roomUsers, setRoomUsers] = useState(["user1", "user2", "user3"]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("message", (data) => {
      setReceivedMessages((prev) => [...prev, data]);
    });

    return () => socket.disconnect();
  }, [socket]);

  const leaveRoom = () => {
    navigate("/");
  };

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
              {user}
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
        <div className="h-[30rem] overflow-y-auto">
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
          />
          <button type="button">
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
