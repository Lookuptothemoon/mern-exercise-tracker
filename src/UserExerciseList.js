import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "./api";
import Exercise from "./Exercise";

function UserExerciseList() {
  const params = useParams();
  const username = params.username;
  const [userExists, setUserExists] = useState(false);
  const [userId, setUserId] = useState("");
  const [userExercises, setUserExercises] = useState([]);

  /* get exercises created by input user */
  useEffect(() => {
    // get user id for input user
    const fetchUserId = async () => {
      await axios
        .get(api.baseURL + "/users/user/" + username)
        .then((resp) => {
          // check if user exists
          if (resp.data) {
            setUserExists(true);
            setUserId(resp.data._id);
          }
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    };

    // get exercise created by input user
    const fetchExercises = async () => {
      await axios
        .get(api.baseURL + "/exercises/user/" + userId)
        .then((resp) => {
          setUserExercises(resp.data);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    };
    fetchUserId();
    fetchExercises();
  }, [userId, username]);

  // return input user's exercises, else make note
  if (!userExists) {
    return (
      <div className="user-exercise-list">
        <p className="user-exercise-list-error">
          user "{username}" does not exist
        </p>
      </div>
    );
  } else {
    return (
      <div className="user-exercise-list">
        <h1 className="user-exercise-list-title">{username}'s exercises</h1>

        <div className="user-exercise-list-exercises">
          {userExercises.length > 0 ? (
            userExercises.map((exercise) => {
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
            })
          ) : (
            <p>{username} has not created any exercises yet</p>
          )}
        </div>
      </div>
    );
  }
}

export default UserExerciseList;
