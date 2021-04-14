import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "./api";
import axios from "axios";
import "./Exercise.css";

function Exercise({ id, duration, date, description, userId }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      await axios
        .get(api.baseURL + "/users/" + userId)
        .then((resp) => {
          setUsername(resp.data.username);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    };
    fetchUsername();
  }, [userId]);

  /* delete exercise from DB */
  const deleteExercise = async () => {
    await axios
      .delete(api.baseURL + "/exercises/" + id)
      .then((resp) => {
        console.log(resp);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  return (
    <div className="exercise">
      <button onClick={deleteExercise}>X</button>
      <Link to={"/edit/" + id}>Edit</Link>
      <h3>{description}</h3>
      <p>Duration: {duration}</p>
      <p>
        User: <Link to={"/user/" + username}>{username}</Link>
      </p>
      <p>Date: {date}</p>
      <p>Id: {id}</p>
    </div>
  );
}

export default Exercise;
