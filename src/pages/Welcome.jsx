import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Welcome = ({ username, setUsername, room, setRoom }) => {
  const navigate = useNavigate();

  const joinRoom = (e) => {
    e.preventDefault();
    if (
      username.trim().length > 0 &&
      room.trim().length > 0 !== "select-room"
    ) {
      navigate("/chat", { replace: true });
    } else {
      toast.error("Please enter all the info 🦄", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-graphite  text-white">
      <div className="w-2/5 bg-purple-blue p-10 rounded-lg">
        <h2 className="text-5xl font-bold text-center mb-6">Chatterbox</h2>
        <form onSubmit={joinRoom}>
          <div className="mb-3">
            <label className="font-bold" htmlFor="username">
              Username
            </label>
            <input
              className="border-2 bg-purple-blue p-2 rounded-lg outline-none w-full text-base font-medium"
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="font-bold" htmlFor="room">
              Select room
            </label>
            <select
              className=" border-2 border-white bg-purple-blue p-2 rounded-lg outline-none w-full text-base font-medium text-center"
              name="room"
              id="room"
              onChange={(e) => setRoom(e.target.value)}
            >
              <option value="select-room">Select Room</option>
              <option value="Room 1">Room 1</option>
              <option value="Room 2">Room 2</option>
            </select>
          </div>
          <div className="flex">
            <button
              className="bg-slate-100 rounded-lg outline-none p-2 text-purple-blue font-semibold w-full mr-3"
              type="submit"
            >
              Join Room
            </button>
            <Link
              className="bg-slate-100 rounded-lg outline-none p-2 text-purple-blue font-semibold w-full text-center"
              to={"/create"}
            >
              Create room
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
        transition:Bounce
      />
    </section>
  );
};

export default Welcome;
