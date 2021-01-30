import { useState } from "react";
import api from "./api";
import axios from "axios";
import "./CreateUser.css";

function CreateUser() {
  /* form state variables */
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  /* add User to DB */
  const addUser = (event) => {
    event.preventDefault();
    const user = {
      firstName,
      lastName,
      username,
    };
    // add user to DB
    axios
      .post(api.baseURL + "/users/add", user)
      .then((resp) => {
        alert("successfully added user");
        console.log(user);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  return (
    <div className="createuser">
      <div className="createuser-content">
        <h1>Create A New User</h1>

        <form className="createuser-form">
          <div className="createuser-form-option">
            <label>First Name: </label>
            <input
              required
              type="text"
              value={firstName}
              placeholder="Enter First Name"
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>

          <div className="createuser-form-option">
            <label>Last Name: </label>
            <input
              required
              type="text"
              value={lastName}
              placeholder="Enter Last Name"
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>

          <div className="createuser-form-option">
            <label>Username: </label>
            <input
              required
              type="text"
              value={username}
              placeholder="Username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <button type="submit" onClick={addUser} className="submit-button">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
