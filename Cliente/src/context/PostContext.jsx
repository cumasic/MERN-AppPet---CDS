import { createContext, useContext, useState } from "react";
import {
  getAllPostsRequest,
  getMyPostsRequest,
  getPostRequest,
  createPostRequest,
  updatePostRequest,
  deletePostRequest,
} from "../api/posts";

const PostContext = createContext();

export const usePosts = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("UsePosts must be used within a PostProvider");
  }

  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const createPost = async (post) => {
    try {
      console.log(post);
      const res = await createPostRequest(post);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getPosts = async () => {
    try {
      const res = await getAllPostsRequest();
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPost = async (id) => {
    try {
      const res = await getPostRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getMyPosts = async () => {
    try {
      const res = await getMyPostsRequest();
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (id,post) => {
    try {
      const res = await updatePostRequest(id,post);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      const res = await deletePostRequest(id);
      if (res.status === 204) {
        setPosts(posts.filter((post) => post._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        getPosts,
        getPost,
        getMyPosts,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
