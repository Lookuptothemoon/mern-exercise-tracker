// initial state
export const initialState =
  localStorage.length > 0
    ? {
        exercises: localStorage.exercises,
        user: {
          username: localStorage.username,
          name: localStorage.name,
          email: localStorage.email,
          token: localStorage.token,
          refreshToken: localStorage.refreshToken,
        },
        loading: false,
        error: null,
      }
    : {
        exercises: [],
        user: null,
        loading: false,
        error: null,
      };

// get total number of exercises
export const getExerciseQnty = (exercises) => {
  exercises?.reduce((amount, exercise) => exercise + amount, 0);
};

// reducers
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "REMOVE_USER":
      return {
        ...state,
        user: null,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload.username,
          name: action.payload.name,
          email: action.payload.email,
          password: action.payload.password,
        },
      };
    case "ADD_EXERCISE":
      return {
        ...state,
        exercises: [...state.exercises, action.item],
      };
    default:
      return state;
  }
};

export default reducer;
