// Initialize Firebase
var config = {
    apiKey: "AIzaSyBL3yYEEapk_Q3JQQoRRoIlMuXRWAmY5Mg",
    authDomain: "train-schedule-386cf.firebaseapp.com",
    databaseURL: "https://train-schedule-386cf.firebaseio.com",
    projectId: "train-schedule-386cf",
    storageBucket: "",
    messagingSenderId: "62069113194"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submitBtn").on("click", function (event) {
    console.log("test")
    event.preventDefault();
    var trainname = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTime").val().trim();
    var frequency = $("#frequency").val().trim();
    var formattedTime = moment(firstTrainTime, "HH:mm").format('HH:mm');
    var nextArrival = moment(formattedTime, "HH:mm").format('hh:mm A');
    console.log(nextArrival);
    var minutesAway = moment(nextArrival, "hh:mm A").diff(moment(), "minutes");
    console.log(minutesAway);

    database.ref().push({
        trainname: trainname,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway
    });
});

database.ref().on("child_added", function(childSnapshot) {
    $("tBody").append("<tr><td>" + childSnapshot.val().trainname+ "<td>" + childSnapshot.val().destination + "</td>" +"<td>" + childSnapshot.val().frequency + "</td>" +"<td>" + childSnapshot.val().nextArrival + "</td>" +"<td>" + childSnapshot.val().minutesAway + "</td>");
});