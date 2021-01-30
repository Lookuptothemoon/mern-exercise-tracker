import { Link } from "react-router-dom";
import api from "./api";
import axios from "axios";
import "./Exercise.css";

function Exercise({ data }) {
  /* delete exercise from DB */
  const deleteExercise = () => {
    axios
      .delete(api.baseURL + "/exercises/" + data._id)
      .then((resp) => {
        alert("successfully deleted exercise");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  return (
    <div className="exercise">
      <button onClick={deleteExercise}>X</button>
      <Link to={"/edit/" + data._id}>Edit</Link>
      <h3>{data.description}</h3>
      <p>Duration: {data.duration}</p>
      <p>User: {data.username}</p>
      <p>Date: {data.date}</p>
      <p>ID: {data._id}</p>
    </div>
  );
}

export default Exercise;
