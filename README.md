# Instructions below tell you how to run both front-end and back-end.

### Note: If you run frontend first, there will be some issues since frontend data depends on backend

## Backend
1. Make sure you are in the backend directory
2. Create .env file with MongoDB ATLAS_URI (assumes you have a MongoDB database created) similar to one below:
`
ATLAS_URI=mongodb+srv://<username>:<password>@cluster0.6igvu.mongodb.net/<dbname>
`
3. Run `$ yarn start"` to start Node.js app and keep track of the url the server is running on

## Frontend
1. Go back one directory so you are no longer in the backend directory
2. Edit files CreateExercise.js, CreateUser.js, EditExercise.js, Exercise.js, and ExerciseList.js so that the application is making API calls on the correct port
3. Run `yarn start` to start React app and begin to use application
