npm i 

npm start 

It runs locally on port 8080. For simplicity I am using a mongo db virtual db, that starts with the server. It deletes all data once the app stops running.

The app is evidently bare bones, but it does most of the functionality. It logs in a user with nickname, and the user can create a new story or contribute to an existing one. 
Stories are Completed when they reach the maximum amount of sentences, otherwise they are marked as Active.
Under each sentence that's contributed to the story, a pill displays the nickname of the contributor. 

