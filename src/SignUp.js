import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "./api";
import axios from "axios";
import { useStateValue } from "./StateProvider";
// import "./SignUp.css";

function SignUp() {
  const [state, dispatch] = useStateValue();
  const history = useHistory();
  /* form state variables */
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  // add user to DB
  const registerUser = (event) => {
    event.preventDefault();

    const user = {
      username,
      name,
      email,
      password,
    };

    // attempt to add user to DB
    axios
      .post(api.baseURL + "/users/register", user)
      .then((resp) => {
        setMsg("added user successfully");
      })
      .catch((error) => {
        console.log("Error: " + error);
      });

    history.push("/login");
  };

  if (state.user) {
    return <p>user is already signed in</p>;
  } else {
    return (
      <div className="createuser">
        <div className="createuser-content">
          <p>{msg}</p>

          <h1>Sign Up</h1>

          <form className="createuser-form">
            <div className="createuser-form-option">
              <label>Username: </label>
              <input
                required
                type="text"
                value={username}
                placeholder="Enter Username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div className="createuser-form-option">
              <label>Name: </label>
              <input
                required
                type="text"
                value={name}
                placeholder="Enter First Name"
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="createuser-form-option">
              <label>Email: </label>
              <input
                required
                type="email"
                value={email}
                placeholder="Enter Email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="createuser-form-option">
              <label>Password: </label>
              <input
                required
                type="password"
                value={password}
                placeholder="Enter Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <button
              type="submit"
              onClick={registerUser}
              className="submit-button"
            >
              Sign Up
            </button>

            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
