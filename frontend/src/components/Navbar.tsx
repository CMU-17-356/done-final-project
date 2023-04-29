import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light">
      <a className="navbar-brand" href="/todo">
        DONE
      </a>

      <div className="basic-navbar-nav" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/todo">
              Todos
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/signup">
              History
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/todo">
              Account
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;