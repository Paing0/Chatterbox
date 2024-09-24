import {
  ArrowLeftStartOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

const Room = ({ username, room }) => {
  const [roomUsers, setRoomUsers] = useState(["user1", "user2", "user3"]);
  const [receivedMessages, setReceivedMessages] = useState([
    "aaa",
    "bbb",
    "ccc",
  ]);
  return (
    <section className="flex gap-4 bg-graphite">
      {/* left side */}
      <div className="w-1/3 h-screen bg-purple-blue text-white font-medium">
        <h1 className="text-3xl font-bold text-center mt-5">Chatterbox</h1>
        <div className="mt-10 ps-2">
          <h2 className="flex items-end gap-1 text-xl font-bold">
            <ChatBubbleLeftRightIcon width={30} />
            Room name
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
              <p className="text-sm font-medium font-mono">From bot</p>
              <p className="text-lg font-semibold">{msg}</p>
              <p className="text-sm font-medium font-mono text-right">
                less than a minute ago
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
