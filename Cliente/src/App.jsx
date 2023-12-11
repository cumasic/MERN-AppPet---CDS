import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import MyPostsPage from "./pages/MyPostsPage"
import PostDetailsPage from "./pages/PostDetailsPage"
import ProfilePage from "./pages/ProfilePage"
import ProtectedRoute from "./components/ProtectedRoute"
import PostFormPage from "./pages/PostFormPage";
import NavBar from "./components/NavBar";
import { PostProvider } from "./context/PostContext";
import ChatPage from "./pages/ChatPage";
import { ChatProvider } from "./context/ChatContext";
import { MessageProvider } from "./context/MessageContext";


function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <ChatProvider>
          <MessageProvider>
            <BrowserRouter>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/" element={<HomePage />} />

                <Route element={<ProtectedRoute/>}>
                  <Route path="/my-posts" element={<MyPostsPage/>} />
                  <Route path='/add-post' element={<PostFormPage/>} />
                  <Route path='/edit-post/:id' element={<PostFormPage/>} />
                  <Route path='/posts/:id' element={<PostDetailsPage/>} />
                  <Route path='/profile' element={<ProfilePage/>} />
                  <Route path='/profile/:id' element={<ProfilePage/>} />
                  <Route path="/chats" element={<ChatPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </MessageProvider>
        </ChatProvider>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
