import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import api from "./api";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateExercise.css";

function CreateExercise() {
  // form state variables
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  // users state variable
  const [users, setUsers] = useState([]);

  /* get list of created users from DB */
  useEffect(() => {
    const fetchUsers = async () => {
      await axios
        .get(api.baseURL + "/users")
        .then((resp) => {
          if (resp.data.length > 0) {
            setUsers(resp.data);
          }
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    };
    fetchUsers();
  }, []);

  /* add exercise to DB */
  const addExercise = (event) => {
    event.preventDefault();

    /* Check if user chose user */
    if (username === "Select User" || username === "") {
      alert("choose a user");
      return;
    }

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date,
    };
    // add exercise to DB
    axios
      .post(api.baseURL + "/exercises/add", exercise)
      .then((resp) => {
        alert("successfully added exercise");
        console.log(resp.data);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  return (
    <div className="createexercise">
      <div className="createexercise-content">
        <h1>Create A New Exercise</h1>

        <form className="createexercise-form">
          <div className="createexercise-form-option">
            <label>Username: </label>
            <select
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            >
              <option key="0" value="Select User">
                {" "}
                Select User{" "}
              </option>
              {users.map(function (user) {
                return (
                  <option key={user._id} value={user.username}>
                    {" "}
                    {user.username}{" "}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="createexercise-form-option">
            <label>Description: </label>
            <textarea
              required
              value={description}
              placeholder="Write something ..."
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="createexercise-form-option">
            <label>Duration (in minutes): </label>
            <input
              required
              type="text"
              value={duration}
              placeholder="Duration"
              onChange={(event) => setDuration(event.target.value)}
            />
          </div>

          <div className="createexercise-form-option">
            <label>Date: </label>
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </div>

          <button type="submit" onClick={addExercise} className="submit-button">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateExercise;
