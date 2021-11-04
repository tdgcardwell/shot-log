//warn and confirm before close or refresh
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
});

//bunch o' variables:
const logIt = document.querySelector('#infoGatherer');
const shotLog = document.querySelector('.shot-log');

let scene = document.querySelector('#scene');
let shot = document.querySelector('#shot');
let take = document.querySelector('#take');
let lens = document.querySelector('#lens');
let iso = document.querySelector('#ISO');
let fStop = document.querySelector('#Fstop');
let notes = document.querySelector('#notes');
let circle = document.querySelector('#circle');

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();

// focus scene input on page load
scene.focus();

//add date to header
let heading = document.querySelector('h1');
heading.textContent = `${heading.textContent} - ${month}/${day}/${year}`;

//reset function
function reset(field) {
  field.value = "";
}


//log a scene
logIt.addEventListener('submit', (e)=> {
  e.preventDefault();

  let takeInfo =
                  ` <div class="">${scene.value}</div>
                    <div class="">${shot.value.toUpperCase()}</div>
                    <div class="">${take.value}</div>
                    <div class="">${lens.value}</div>
                    <div class="">${iso.value}</div>
                    <div class="">${fStop.value}</div>
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



  //testing date
  console.log(`${month}/${day}/${year} - ${hours}/${minutes}`);

});

//reset fields when changing shot
shot.addEventListener('input' , (e) => {
  take.value = 1;
  reset(lens);
  iso.value = 800;
  fStop.value = 'ƒ1.8';
})
