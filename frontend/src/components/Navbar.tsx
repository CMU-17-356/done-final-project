import React from "react";
import { useState, useEffect } from "react";

const Navbar = ({navState, setNavState}) => {

  // const [show, setShow] = useState(false);

  // useEffect(() => {
  //   console.log("navbar use effect?")
  //   setShow(true);
  // }, []);

  // // get request  session and see if exists
  console.log("navbar shown", navState)
  // setShow(true);

  return (
    <nav className="navbar navbar-expand-sm navbar-light">
      <a className="navbar-brand" href="/todo">
        DONE
      </a>

      {(navState) && (<div className="basic-navbar-nav" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/todo">
              Todos
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/history">
              History
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Logout
            </a>
          </li>
        </ul>
      </div>)}
    </nav>
  );
};

export default Navbar;