var trainName = "";
var destinationName = "";
var firstTime = "";
var frequency = "";



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
var database = firebase.database();

// Button for adding new train
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    // grab user input
    var trainName = $("#myTrain").val().trim();
    var destinationName = $("#destination").val().trim();
    var firstTime = $("#my-first-train").val().trim();
    var frequency = $("#frequency").val().trim();

    // temporary object for hold data
    var newTrain = {
        name: trainName,
        destination: destinationName,
        nextChooChoo: frequency,
        trainTime: firstTime
    };

    // upload data to database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.trainTime);
    console.log(newTrain.nextChooChoo);

    alert("Train added successfully");

    // Clear the input boxes
    $("#myTrain").val("");
    $("#destination").val("");
    $("#my-first-train").val("");
    $("#frequency").val("");
});


// add train to firebase database and row in html when user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    // console.log(childsnapshot.val());
    // alert("hello");

    //  store all into a variable.
    trainName = childSnapshot.val().name;
    destinationName = childSnapshot.val().destination;
    firstTime = childSnapshot.val().trainTime;
    frequency = childSnapshot.val().nextChooChoo;

    console.log(trainName);
    console.log(destinationName);
    console.log(firstTime);
    console.log(frequency);




    // First time
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current time
    var currentTime = moment();
    console.log("CURRENT TIME:" + moment(currentTime).format("hh:mm"));

    // Difference between times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Mins until train
    var minutesAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next train
    var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var formatTime = moment(nextTrain, 'HH:mm').format('hh:mm a');
    console.log(formatTime);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destinationName),
        $("<td>").text(frequency),
        $("<td>").text(formatTime),
        $("<td>").text(minutesAway),

    );

    $("#trainTable > tbody").append(newRow);


});






