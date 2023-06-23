import React, { useContext } from "react";
import "./Header.css";
import logo from "/images/Logo.svg";
import { Link } from "react-router-dom";
import ActiveLink from "../activeLink/ActiveLink";
import { AuthContext } from "../providers/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .the(() => {})
      .catch(() => {});
  };
  return (
    <div className="flex justify-between items-center bg-slate-600 px-20 py-2 header">
      <div>
        <img src={logo} alt="" />
      </div>
      <nav>
        <ActiveLink to="/">Shop</ActiveLink>
        <ActiveLink to="/order">Orders</ActiveLink>
        <ActiveLink to="/inventory">Inventory</ActiveLink>
        {user ? (
          <Link onClick={handleLogOut} className="text-amber-500 font-bold">
            Logout
          </Link>
        ) : (
          <ActiveLink to="/login">Login</ActiveLink>
        )}
        <ActiveLink to="/sign-up">Sign Up</ActiveLink>{" "}
        {user && (
          <span className="text-white">
            {" "}
            <i>
              <small>Welcome: {user.email}</small>{" "}
            </i>
          </span>
        )}
      </nav>
    </div>
  );
};

export default Header;
