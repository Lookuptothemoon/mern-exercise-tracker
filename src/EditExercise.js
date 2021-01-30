import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "./api";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EditExercise.css";

function EditExercise() {
  /* get url parameters */
  const params = useParams();
  /* state variables for DB content */
  const [exercise, setExercise] = useState({});
  const [users, setUsers] = useState([]);
  /* form state variables */
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());

  /* get content from DB */
  useEffect(() => {
    /* get exercises from DB */
    const fetchExercise = async () => {
      await axios
        .get(api.baseURL + "/exercises/" + params.id)
        .then((resp) => {
          setExercise(resp.data);
          console.log(resp.data);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    };
    fetchExercise();

    /* get users */
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

  /* update current exercise */
  const updateExercise = (event) => {
    event.preventDefault();

    /* Check if user chose user */
    if (username === "Select User" || username === "") {
      alert("choose a user");
      return;
    }

    const updatedExercise = {
      username: username,
      description: description,
      duration: duration,
      date: date,
    };
    // add exercise to DB
    axios
      .post(api.baseURL + "/exercises/update/" + params.id, updatedExercise)
      .then((resp) => {
        alert("successfully updated exercise");
        console.log(resp.data);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  return (
    <div className="editexercise">
      <h1>Edit Exercise</h1>

      <div className="editexercise-prev">
        <h3>{exercise.description}</h3>
        <p>Duration: {exercise.duration}</p>
        <p>User: {exercise.username}</p>
        <p>Date: {exercise.date}</p>
        <p>ID: {exercise._id}</p>
      </div>

      <div className="createexercise-content">
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

          <button
            type="submit"
            onClick={updateExercise}
            className="submit-button"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditExercise;
