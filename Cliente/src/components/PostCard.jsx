import { useAuth } from "../context/AuthContext";
import { useChats } from "../context/ChatContext";
import { usePosts } from "../context/PostContext";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  const { isAuthenticated, user } = useAuth();
  const { deletePost } = usePosts();
  const { createChat } = useChats()

  const handleClick = async () => {
    await createChat(user.id, post.user)
  }

  return (
    <div className="bg-slate-100 p-10 relative flex flex-col h-[500px] justify-between overflow-hidden">
      <p className="">{post.description}</p>
      {post.photo ? (
        <>
          <img src={post.photo.url} 
          className="my-2 max-w-full max-h-[80%] h-auto"
          alt="Post image" />
        </>
      ) : (
        <></>
      )}
      <div className="flex justify-between">
        <div className="flex justify-between">
          {isAuthenticated && (user.id === post.user || user.id === post.user._id) ? (
            <>
            <div className="mx-20">
              <Link
                className="text-sm font-bold bg-blue-600 text-slate-200 rounded-md p-1.5 px-2.5 m-2 ml-0 hover:bg-blue-500 hover:text-white"
                to={`/edit-post/${post._id}`}
              >
                Editar
              </Link>
              <button
                className="text-sm font-bold rounded-md bg-red-600 p-1.5 px-2.5 m-2 ml-0 hover:bg-red-500 text-white"
                onClick={() => deletePost(post._id)}
              >
                Eliminar
              </button>

            </div>
            </>
          ) : (
            <>
              <Link
                className="text-sm font-bold bg-blue-600 text-slate-200 rounded-md p-1.5 px-2.5 m-2 ml-0 hover:bg-blue-400 hover:text-white"
                to={`/chats`}
                onClick={handleClick}
              >
                Contactar
              </Link>
              <Link
                className="text-sm font-bold rounded-xl border-blue-950 p-1.5 px-2.5 m-2 ml-0 hover:text-gray-900"
                to={`/posts/${post._id}`}
              >
                Más información
              </Link>
            </>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-600 absolute bottom-5 right-5">
        {new Date(post.date).toLocaleDateString()}
      </p>
    </div>
  );
}

export default PostCard;
