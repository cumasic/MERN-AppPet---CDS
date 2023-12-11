import React, { useEffect } from "react";
import { usePosts } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";

function HomePage() {
  const { isAuthenticated } = useAuth();
  const { getPosts, posts } = usePosts();

  useEffect(() => {
    getPosts();
    console.log(posts)
  }, []);

  return (
    <div>
      <NavBar />
      <div className="m-5">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">Mascotas desaparecidas</h1>
          {isAuthenticated ? (
            <>
              <Link
                to={`/add-post/`}
                className="rounded-lg border border-blue-300 text-blue-300 p-2 hover:bg-blue-300 hover:text-white"
              >
                Añadir +
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:grid-cols-2 mt-5">
          {posts.map((post) => (
            <PostCard post={post} key={post._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
