import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { isAuthenticated, logOut, user } = useAuth();
  console.log(user);
  return (
    <nav className="relative w-full h-[8vh] bg-[#29b650] font-serif bg-opacity-90 shadow-md">
      <div className="flex items-center justify-between h-full">
        <div className="ml-10">
          {/* foto de la página */}
          <p className="font-bold text-2xl text-white">Find Pets</p>
        </div>
        <ul className="flex gap-x-10 m-4 text-white text-lg font-bold">
          {isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/"
                  className=" hover:text-gray-800 transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/my-posts"
                  className="hover:text-gray-800 transition duration-300"
                >
                  Publicaciones
                </Link>
              </li>
              <li>
                <Link
                  to="/add-post"
                  className="hover:text-gray-800 transition duration-300"
                >
                  Añadir
                </Link>
              </li>
              <li>
                <Link
                  to="/chats"
                  className="hover:text-gray-800 transition duration-300"
                >
                  Chats
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-red-400 hover:text-red-800 transition duration-300"
                  onClick={() => logOut()}
                >
                  Cerrar sesión
                </Link>
              </li>
              <div className="flex gap-2">
                <li>
                  <Link
                    to="/profile"
                    className="hover:text-gray-800 transition duration-300"
                  >
                    <h1>{user.username}</h1>
                  </Link>
                </li>
                {user.photo && user.photo.url ? (
                  <>
                    <img
                      src={user.photo.url}
                      className="h-8 w-9 mr-1 object-cover rounded-full"
                    />
                  </>
                ) : (
                  <>
                    <img
                      className="h-8 w-9 mr-1 object-cover rounded-full"
                      src="https://res.cloudinary.com/disi3bzmx/image/upload/v1701121341/posts/bhbua911khdfqpupieap.jpg"
                    />
                  </>
                )}
                <li></li>
              </div>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="hover:text-gray-800 transition duration-300"
                >
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-gray-800 transition duration-300"
                >
                  Registrarse
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
