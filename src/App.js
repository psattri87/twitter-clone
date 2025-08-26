import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/login/Signup";
import Login from "./pages/login/Login";
import Home from "./pages/Home";
import "./App.css";
import Messages from "./pages/messages/Messages";
import Bookmark from "./pages/bookmark/Bookmark";
import Lists from "./pages/lists/Lists";
import Profile from "./pages/profile/Profile";
import More from "./pages/more/More";
import Feed from "./pages/feed/Feed";
import Explore from "./pages/explore/Explore";
import Notifications from "./pages/notifications/Notifications";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {
  return (
    <div className="app">
      <UserAuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Feed />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />}>
            <Route path="feed" element={<Feed />} />
            <Route path="explore" element={<Explore />} />
            <Route path="notification" element={<Notifications />} />
            <Route path="messages" element={<Messages />} />
            <Route path="bookmarks" element={<Bookmark />} />
            <Route path="lists" element={<Lists />} />
            <Route path="profile" element={<Profile />} />
            <Route path="more" element={<More />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
