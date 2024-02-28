import React, { useEffect } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";

const Navbar = ({ toogle, light, mode }) => {
  const navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const logouthandler = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };
  const note = localStorage.getItem("token");

  console.log(localStorage.getItem("login"));
  console.log(localStorage.getItem("token"), "item json");
  return (
    <nav
      className={`navbar navbar-expand-lg bg-${light} navbar-${light}`}
      style={{
        fontSize: "1.1rem",
        fontWeight: "700",
      }}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          iNotebook
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
              >
                Home
              </NavLink>
            </li>
            {note && (
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${
                    location.pathname === "/Notes" ? "active" : ""
                  }`}
                  to="/Notes"
                >
                  Notes
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink
                className={`nav-link ${
                  location.pathname === "/About" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </NavLink>
            </li>
          </ul>
          <div>
            <div className="toggle">
              <input type="checkbox" checked={toogle} onChange={mode} />
              <span
                className="button"
                // style={toogle ? mystyle : { backgroundColor: "white" }}
              ></span>
              <span
                className="label"
                // style={toogle ? mystyle : { backgroundColor: "white" }}
              >
                ☼
              </span>
            </div>
          </div>
          {!localStorage.getItem("token") ? (
            <form className="d-flex gap-2" role="search">
              <NavLink
                className="btn btn-primary"
                to="/login"
                role="button"
                // style={btnstyle}
              >
                Login
              </NavLink>
              <NavLink
                className="btn btn-primary"
                to="signup"
                role="button"
                // style={btnstyle}
              >
                Signup
              </NavLink>
            </form>
          ) : (
            <NavLink
              className="btn btn-dark"
              to="/login"
              onClick={logouthandler}
              role="button"
              // style={btnstyle}
            >
              Logout
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
