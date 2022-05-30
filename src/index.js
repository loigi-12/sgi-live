import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// import Register from "./views/Register";
// import Dashboard from "./views/Dashboard";
// import Subjects from "./views/Subjects";
// import NotFound from "./views/NotFound";
// import AdminNavbar from "./components/Navbars/AdminNavbar";
// import Sidebar from "./components/Sidebar/Sidebar";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { AuthProvider } from "contexts/AuthContext";

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById("root")
);

reportWebVitals();
