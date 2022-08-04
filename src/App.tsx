import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";
import Posts from "./components/Posts";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Posts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<Posts />} />
      </Routes>
    </Router>
  );
}

export default App;
