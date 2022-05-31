import React, { useState, useEffect, useRef } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import { db, firebase } from "./firebase";

import { AuthProvider, useAuth } from "./contexts/AuthContext";

import Dashboard from "./views/Dashboard";
import Subjects from "./views/Subjects";
import Grades from "./views/Grades";
import Courses from "./views/Courses";
import Students from "views/Students";
import StudentDetails from "./views/StudentDetails";
import UserProfile from "./views/UserProfile";
import NotFound from "./views/NotFound";

import TopBar from "./components/Navbars/AdminNavbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer";
import UpdateProfile from "./components/UpdateProfile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import AddTeacher from "views/AddTeacher";
import AddStudent from "views/AddStudent";
import AddSubject from "views/AddSubject";

function App(props) {
  const location = useLocation();
  const mainPanel = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState([]);
  const [emails, setEmails] = useState();

  // Get Current User
  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);

  const unSubscribe = async () => {
    return await firebase
      .auth()
      .onAuthStateChanged((user) => userHandler(user));
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }

    unSubscribe();
  }, [location]);

  return (
    <React.Fragment>
      <div className="wrapper">
        {currentUser && <Sidebar />}
        <div className={currentUser && "main-panel"} ref={mainPanel}>
          {currentUser && <TopBar />}
          <AuthProvider>
            <Switch>
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/profile" component={UserProfile} />
              <PrivateRoute path="/subjects" component={Subjects} />
              <PrivateRoute path="/grades" component={Grades} />
              <PrivateRoute path="/students" component={Students} />
              <PrivateRoute path="/students/:id" component={StudentDetails} />
              <PrivateRoute path="/courses" component={Courses} />
              <PrivateRoute path="/add-teacher" component={AddTeacher} />
              <PrivateRoute path="/add-student" component={AddStudent} />
              <PrivateRoute path="/add-subject" component={AddSubject} />
              {/* {!currentUser && <Route path="/signup" component={Signup} />}
              {!currentUser && <Route path="/login" component={Login} />} */}
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/404" component={NotFound} />
              <Redirect from="/" exact to="dashboard" />
            </Switch>
          </AuthProvider>
        </div>
        {/* <Footer /> */}
      </div>
    </React.Fragment>
  );
}

export default App;
