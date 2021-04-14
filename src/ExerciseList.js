import { useState, useEffect } from "react";
import axios from "axios";
import api from "./api";
import Exercise from "./Exercise";
import "./ExerciseList.css";

function ExerciseList() {
  const [exercises, setExercises] = useState([]);

  /* get list of all exercises from DB */
  useEffect(() => {
    const fetchExercises = async () => {
      await axios
        .get(api.baseURL + "/exercises")
        .then((resp) => {
          setExercises(resp.data);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    };
    fetchExercises();
  }, []);

  return (
    <div className="exerciselist">
      <h1>All Exercises</h1>
      <ul>
        {exercises.map(function (exercise) {
          return (
            <Exercise
              key={exercise._id}
              id={exercise._id}
              duration={exercise.duration}
              date={exercise.date}
              description={exercise.description}
              userId={exercise.userId}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ExerciseList;
