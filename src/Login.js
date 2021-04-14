import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "./api";
import axios from "axios";
import { useStateValue } from "./StateProvider";
// import "./Login.css";

/* set token and refresh token array */
localStorage.setItem("token", []);
localStorage.setItem("refreshToken", []);

function Login() {
  const [state, dispatch] = useStateValue();
  const history = useHistory();
  /* form state variables */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [error, setError] = useState("");

  // login user
  const login = async (event) => {
    event.preventDefault();

    const user = {
      username,
      password,
    };

    // login user and get token
    await axios
      .post(api.baseURL + "/auth/login", user)
      .then((resp) => {
        /*
        localStorage.setItem("token", resp.data.accessToken);
        localStorage.setItem("refreshToken", resp.data.refreshToken);
        */
        setToken(resp.data.accessToken);
        setRefreshToken(resp.data.refreshToken);
        setIsAuth(true);
        console.log("token: " + resp.data.accessToken);
        console.log("refresh: " + resp.data.refreshToken);
        console.log(token);
        console.log(refreshToken);
        console.log(isAuth);
      })
      .catch((error) => {
        console.log("Error: " + error);
        console.log(error.request);
        if (error.request.status === 400) setError(error.response.data);
      });

    // check if login successful then set user
    if (isAuth) {
      dispatch({
        type: "SET_USER",
        user: { token, refreshToken },
      });
    }
    console.log("user: " + state.user);
    //history.push("/");
  };

  if (state.user) {
    return <p>user already logged in</p>;
  } else {
    return (
      <div className="createuser">
        <div className="createuser-content">
          <p style={{ color: "red" }}>{error}</p>

          <h1>Login</h1>

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
              <label>Password: </label>
              <input
                required
                type="password"
                value={password}
                placeholder="Enter Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <button type="submit" onClick={login} className="submit-button">
              Login
            </button>

            <p>
              Are you a new user? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
