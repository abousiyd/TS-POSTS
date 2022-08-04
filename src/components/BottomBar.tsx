import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import storage from "../utils/storage";

const BottomBar:React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const handleLogout = () => {
    storage.clearItem("posts");
    storage.clearItem("userId");
    navigate("/");
  };
  return (
    <div className="bottom-bar">
      <Link className="bottom-bar__item" to="/home">
        Home
      </Link>
      <Link className="bottom-bar__item" to="/profile">
        Profile
      </Link>
      <span className="bottom-bar__item" role="button" onClick={handleLogout}>
        Logout
      </span>
    </div>
  );
};

export default BottomBar;
