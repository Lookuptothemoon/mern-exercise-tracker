import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import ExerciseList from "./ExerciseList";
import EditExercise from "./EditExercise";
import CreateExercise from "./CreateExercise";
import CreateUser from "./CreateUser";
import "./App.css";

function App() {
  return (
    <h1>My React App</h1>
    /*
    <Router>
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

          <Route path="/create">
            <Navbar />
            <CreateExercise />
          </Route>

          <Route path="/user">
            <Navbar />
            <CreateUser />
          </Route>
        </Switch>
      </div>
    </Router>
    */
  );
}

export default App;
