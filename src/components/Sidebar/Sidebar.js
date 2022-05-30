import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { db, firebase } from "../../firebase";
import { Nav } from "react-bootstrap";

import routes from "routes.js";

function Sidebar() {
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState();
  const [account, setAccount] = useState("");

  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const checkUser = async () => {
    try {
      await db.collection("users").onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          if (doc.data().email === email) {
            setAccount(doc.data().accountType);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getEmail = async () =>
    await firebase.auth().onAuthStateChanged((user) => setEmail(user.email));

  useEffect(() => {
    getEmail();
    checkUser();
  });

  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a href="/" className="simple-text logo-mini mx-1">
            <div className="logo-img">
              <img
                src={require("assets/img/sdssu_logo.png").default}
                alt="..."
              />
            </div>
          </a>
          <a className="simple-text" href="/">
            Student Grade Inquiry
          </a>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (
              !prop.redirect &&
              prop.visible !== false &&
              prop.accountType.includes(account)
            )
              return (
                <li
                  className={
                    prop.upgrade ? "active active-pro" : activeRoute(prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
