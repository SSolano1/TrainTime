var config = {
    apiKey: "AIzaSyCX8lMWA3TBgyD8h1oX5KrX7TAaJoS8Gmg",
    authDomain: "train-schedule-13609.firebaseapp.com",
    databaseURL: "https://train-schedule-13609.firebaseio.com",
    projectId: "train-schedule-13609",
    storageBucket: "train-schedule-13609.appspot.com",
    messagingSenderId: "973663694750"
  };
  firebase.initializeApp(config);

//   variable to reference database
var database = firebase.database()

// Button for adding new train
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

// grab user input
var trainName = $("#add-train-btn").val().trim();
var destinationName = $("#destination").val().trim();
var firstTime = moment($("#first-train").val().trim(); "HH:mm").format("X");
var frequency = $("#rate").val().trim();

// temporary object for hold data
var newTrain = {
    name: trainName,
    destination: destinationName,
    firstTrain: firstTime,
    nextTrain: frequency
};

// upload data to database
database.ref().push(newTrain);

console.log (newTrain.name);
console.log (newTrain.destination);
console.log (newTrain.firstTrain);
console.log (newTrain.nextTrain);

alert("Train added successfully");

// Clear the input boxes
$("#add-train-btn").val("");
$("#destination").val("");
$("#first-train").val("");
$("#rate").val("");
});


// add train to firebase database and row in html when user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childsnapshot.val())

//  store all into a variable.
var trainName = childSnapshot.val().name;
var destinationName = childSnapshot.val().destination;
var firstTime = childSnapshot.val().firstTrain;
var frequency = childSnapshot.val().nextTrain;

console.log(trainName);
console.log(destinationName);
console.log(firstTime);
console.log(frequency);


})






