import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context api/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  // Function to get the user's online/offline status
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  const isOnline = onlineUsers.includes(selectedConversation._id); // For image Status

  return (
    <div className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className="flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300 rounded-md p-2">
        {/* Avatar with conditional online/offline class */}
        <div className="relative">
          <div className="w-16 rounded-full overflow-hidden">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="User Avatar"
            />
          </div>
          {/* Status indicator */}
          <span
            className={`absolute bottom-0 right-0 block w-4 h-4 rounded-full ${
              isOnline ? "bg-green-500" : "bg-gray-500"
            }`}
          />
        </div>
        <div>
          <h1 className="text-xl text-white">{selectedConversation.fullname}</h1>
          <span className="text-sm text-gray-400">
            {getOnlineUsersStatus(selectedConversation._id)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;
