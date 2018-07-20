// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCyzwdkg-YFM8gyyQzoM5lfviyQRrEFyi4',
  authDomain: 'timesheet-15d3d.firebaseapp.com',
  databaseURL: 'https://timesheet-15d3d.firebaseio.com',
  projectId: 'timesheet-15d3d',
  storageBucket: '',
  messagingSenderId: '356835954645'
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var clientName = '';
var projectName = '';
var startDate = 0;
var monthsWorked = 0;
var monthlyRate = 0;
var totalBilled = 0;

// Capturing the Button Click Event

$('.submit').on('click', function(event) {
  event.preventDefault();

  // values from form
  clientName = $('#clientName')
    .val()
    .trim();
  projectName = $('#clientProject')
    .val()
    .trim();
  startDate = $('#startDate')
    .val()
    .trim();
  monthsWorked = 0;
  monthlyRate = $('#monthlyRate')
    .val()
    .trim();
  totalBilled = 0;

  // push to database
  database.ref().push({
    clientName: clientName,
    projectName: projectName,
    startDate: startDate,
    monthlyRate: monthlyRate,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

// Adding each to the database

database.ref().on(
  'child_added',
  function(childSnapshot) {
    console.log(childSnapshot.val().clientName);
    console.log(childSnapshot.val().projectName);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().monthlyRate);

    // LOAD TO TABLE
    // full list of items to the well
    $('.billabeTable tr:last').after(
      '<td scope="row"><span class="clientName">' +
        childSnapshot.val().clientName +
        '</span></td><td><span class="projectName">' +
        childSnapshot.val().projectName +
        '</span></td><td><span class="startDate">' +
        childSnapshot.val().startDate +
        '</span></td><td><span class="monthsWorked">' +
        monthsWorked +
        '</span></td><td><span class="monthlyRate">' +
        childSnapshot.val().monthlyRate +
        '</span></td><td><span class="totalBilled">' +
        totalBilled +
        '</span></td>'

      // "<div class='well'><span class='member-name'> " +
      //   childSnapshot.val().name +
      //   " </span><span class='member-email'> " +
      //   childSnapshot.val().email +
      //   " </span><span class='member-age'> " +
      //   childSnapshot.val().age +
      //   " </span><span class='member-comment'> " +
      //   childSnapshot.val().comment +
      //   ' </span></div>'
    );
  },
  function(errorObject) {
    console.log('Errors handled: ' + errorObject.code);
  }
);
