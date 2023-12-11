import { useEffect, useState } from "react";
import { getUserRequest } from "../api/user";

function Conversation({ data, currentUserId, online }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find(
      (id) => id !== currentUserId      /* usuario con el que queremos chatear */
    ); 
    
    const getUserData = async () => {
      try {
        const { data } = await getUserRequest(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <>
  <div className="mx-10 my-2 hover:bg-slate-200 w-40 rounded-xl p-4">
    <div className="flex">
        {/* foto de usuario */}
        <div className="flex flex-col">
            <span className="font-bold">{userData?.username}</span>
            <span>{online? 'Online': 'Offline'}</span>
        </div>
    </div>
  </div>
  <hr className="border-t-0.1 border-gray-300"/>
  </>
  )
}

export default Conversation;
