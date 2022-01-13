//warn and confirm before close or refresh
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
});

//bunch o' variables:
const logIt = document.querySelector('#infoGatherer');
const shotLog = document.querySelector('.shot-log');
let storedTakes;

//reset function
function reset(field) {
  field.value = "";
}

// Show the stored takes

function checkAndDisplay(){

  // check localstorage for saved information - if there are stored takes...
  if (localStorage.length > 0) {
    // ... get them...
    storedTakes = JSON.parse(localStorage.getItem('locallyStored'));
    console.log('takes retrieved');

    // ... and add to the page:
    // something to collect the info...
    let takesToInsert = "";

    // loop through each, building info
    for (let i=0; i<storedTakes.length; i++) {

      let eachOne;

      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();

      let takeInfo =
                      ` <div class="">${scene.value}</div>
                        <div class="">${shot.value.toUpperCase()}</div>
                        <div class="">${take.value}</div>
                        <div class="">${lens.value}</div>
                        <div class="">${iso.value}</div>
                        <div class="">ƒ${fStop.value}</div>
                        <div class="">${notes.value}</div>
                        <div class="">${hours}:${minutes}</div>`;

      takesToInsert += eachOne;
    }

    // add it.
    $('#new-members h3').after(takesToInsert);

  };
}


// ========== On page load:

checkAndDisplay();

/*
======================================================
When Log button clicked (or form submitted):
======================================================
*/

logIt.addEventListener('submit', (e)=> {

  // prevent default
  e.preventDefault();

  // when was this?
  let date = new Date();

  // what are we storing?
  let scene = document.querySelector('#scene');
  let shot = document.querySelector('#shot');
  let take = document.querySelector('#take');
  let lens = document.querySelector('#lens');
  let iso = document.querySelector('#ISO');
  let fStop = document.querySelector('#Fstop');
  let notes = document.querySelector('#notes');
  let circle = document.querySelector('#circle');

  // make an array of the information
  let thisTake =
    {scene: scene.value,
    shot: shot.value,
    take: take.value,
    lens: lens.value,
    iso: iso.value,
    fStop: fStop.value,
    notes: notes.value,
    dateTime: date
    };

  if ($(circle).is(":checked")) {
      thisTake.circle = true;
  } else {
      thisTake.circle = false;
  }

  // add it to local storage
  // need to remember to ADD not overwrite these.
  function saveSettings() {

    // get existing
    storedTakes = JSON.parse(localStorage.getItem('locallyStored'));

    // add thisTake to the end of storedTakes
    storedTakes.push(thisTake);

    // save it back again
    localStorage.setItem('locallyStored', JSON.stringify(storedTakes));
    console.log('take saved');
  };

  // increment take number
  take.value ++;

  // reset other relevant fields
  reset(scene);
  reset(shot);
  reset(notes);

  // reset the checkbox
  circle.checked = false;

  //focus shot input
  shot.focus();

  // then update the displayed info
  checkAndDisplay();

});


// ---------------------------------------------------------------
// let's mess with these buttons
let saveButton = $('#saveButton')
saveButton.click(function() {
  event.preventDefault();
  saveSettings();
});

let cancelButton = $('#cancelButton')
cancelButton.click(function() {
  event.preventDefault();
  localStorage.clear()

  // reset the sliders
  emailNotifications.prop("checked", false);
  setProfileToPublic.prop("checked", false);

  // reset the menu
  // we want to filter by timeZoneId
  let zoneReset = $('#time_zones option').filter('[timeZoneId ="0"]');
  // then we want to give that one the property 'selected'
  zoneReset.prop("selected", true);
  console.log('settings reset');
  alert('settings reset');
});
// ---------------------------------------------------------------






  // --------------------------

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let takeInfo =
                  ` <div class="">${scene.value}</div>
                    <div class="">${shot.value.toUpperCase()}</div>
                    <div class="">${take.value}</div>
                    <div class="">${lens.value}</div>
                    <div class="">${iso.value}</div>
                    <div class="">ƒ${fStop.value}</div>
                    <div class="">${notes.value}</div>
                    <div class="">${hours}:${minutes}</div>`;

  //prob better way to do this
  if (circle.checked){
    takeInfo = takeInfo.replace(`<div class="">${take.value}</div>` ,
                                `<div class="good-take">${take.value}</div>`);
  }

  //this too...
  shotLog.insertAdjacentHTML(
    'beforeend',
    `<div class="shot-row">
      ${takeInfo}
    </div>`
  );


// =================================================

//reset fields when changing shot
shot.addEventListener('input' , (e) => {
  take.value = 1;
  // reset(lens);
  // iso.value = 800;
  // fStop.value = 'ƒ1.8';
})

//reset take when changing scene
scene.addEventListener('input' , (e) => {
  take.value = 1;
  // reset(lens);
  // iso.value = 800;
  // fStop.value = 'ƒ1.8';
})
