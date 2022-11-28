import { NavLink } from "react-router-dom";
import Avatar from "../avatar/avatar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";

//styles & images
import "./sidebar.css";
import DashboardIcon from "../../assets/dashboard_icon.svg";
import AddIcon from "../../assets/add_icon.svg";

export default function Sidebar() {
  const { user } = useAuthContext();
  const [sideClose, setSideClose] = useState(false);

  const handleClick = () => {
    sideClose ? setSideClose(false) : setSideClose(true);
  };

  return (
    <div className={!sideClose ? "sidebar" : "sidebar-closed"}>
      <div className="sidebar-content">
        <button className="sidebar-close btn" onClick={handleClick}>
          {" "}
          {!sideClose ? "x" : ">"}
        </button>
        {!sideClose && (
          <div className="user">
            <Avatar src={user.photoURL} />
            <p>Hey, {user.displayName}</p>
          </div>
        )}
        <nav className="links">
          <ul>
            <li>
              <NavLink exact="true" to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                {!sideClose && <span> Dashboard </span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add project icon" />
                {!sideClose && <span> New Project </span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/customers">
                <img src={DashboardIcon} alt="customers icon" />
                {!sideClose && <span> Customers </span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/createCustomer">
                <img src={AddIcon} alt="add customer icon" />
                {!sideClose && <span> New Customer </span>}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
