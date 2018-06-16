$(document).ready(function() {
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAx-Xys6iXD-w8ECQjMnSpp117SPgxyTr4",
  authDomain: "train-time-8d2a5.firebaseapp.com",
  databaseURL: "https://train-time-8d2a5.firebaseio.com",
  projectId: "train-time-8d2a5",
  storageBucket: "train-time-8d2a5.appspot.com",
  messagingSenderId: "154247045604"
};

firebase.initializeApp(config);

var trainData = firebase.database();
// clicking the submit calls to getData function
$("#addTrainBtn").on("click",function() {
    event.preventDefault();
    getData();
})

// function to getData
function getData(){
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10,"years").format("X");
  var frequency = $("#frequencyInput").val().trim();

  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  }

  trainData.ref().push(newTrain);

  alert("Train Added!");
// empting the divs after click
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("firstTrainInput").val("");
  $("frequencyInput").val("");

  return false;
};

trainData.ref().on("child_added",function(snapshot){
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var firstTrain = snapshot.val().fireTrain;

  // Difference between the times
  var diffTime = moment().diff(moment(firstTrain), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder) from class notes.... 
  //this will tell us the differnce in time left from differnce in time and frequency of the train
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
  // var remainder 
  var minutes = frequency - tRemainder;
  var arrival = moment().add(parseInt(minutes, "m")).format("hh:mm A");

  console.log(tRemainder);
  console.log(minutes);
  console.log(arrival);

  $("#trainTable > tbody").append("<tr><td>" +name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
})
})