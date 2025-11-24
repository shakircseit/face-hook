import { useNavigate } from "react-router";
import LogOutIcon from "../../assets/icons/logout.svg";
import { useAuth } from "../../hooks/useAuth";
const LogOut = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const handleLogOut = () => {
    setAuth({});
    navigate("/login");
  };
  return (
    <button className="icon-btn" onClick={handleLogOut}>
      <img src={LogOutIcon} alt="logout" />
    </button>
  );
};

export default LogOut;
