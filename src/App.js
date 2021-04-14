import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import ExerciseList from "./ExerciseList";
import EditExercise from "./EditExercise";
import UserExerciseList from "./UserExerciseList";
import CreateExercise from "./CreateExercise";
import CreateUser from "./CreateUser";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import "./App.css";

// set local storage
localStorage.setItem("token", []);
localStorage.setItem("refreshToken", []);

console.log("localStorage: ", localStorage);
if (localStorage.length > 0) {
  console.log("not empty");
} else {
  console.log("empty");
}

function App() {
  return (
    <Router basname="/">
      <div className="app">
        <Switch>
          <Route path="/" exact>
            <Navbar />
            <ExerciseList />
          </Route>

          <Route path="/edit/:id">
            <Navbar />
            <EditExercise />
          </Route>

          <Route path="/user/:username">
            <Navbar />
            <UserExerciseList />
          </Route>

          <Route path="/create">
            <Navbar />
            <CreateExercise />
          </Route>

          <Route path="/accounts/edit">
            <Navbar />
            <Profile />
          </Route>

          <Route path="/user">
            <Navbar />
            <CreateUser />
          </Route>

          <Route path="/login">
            <Navbar />
            <Login />
          </Route>

          <Route path="/signup">
            <Navbar />
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
