//warn and confirm before close or refresh

// window.addEventListener('beforeunload', function (e) {
//     e.preventDefault();
//     e.returnValue = '';
// });

let log; // we're either starting a new one, or loading one.

// ask if new or loading
if (confirm('Start New Log?')) {
  log = new Log(prompt('Project Name'),prompt('Direcor Name'),prompt('DoP'));
  console.log(`Project Log created`);
} else {
  let logToLoad = prompt('Log to Load?');
  recall(logToLoad);

}

// if load, then get from local storage
// to recall saved log
function recall(saved){

  let stored = localStorage.getItem(saved);
  if (stored) {
    let _log= JSON.parse(stored);
     // apply these to a new One

    log = new Log(_log.project,_log.director,_log.camera);
    log.takes = _log.takes;
    log.setups = _log.setups;
    console.log(`${saved} loaded`);
  } else {
    console.log('no log found with that name');
  }
}
// =============================================

let selectDropdown = document.querySelector('#select-log')

function generateDropdown() {
  let options = `<option value="">Choose Log to Load</option>`;
  selectDropdown.innerHTML = options;

  for (const key in localStorage) {

    if (localStorage.hasOwnProperty(key)) {

        console.log(`${key}: ${localStorage[key]}`);
        options += `<option value="${key}">${key}</option>`;

    }
  }

  selectDropdown.innerHTML = options;
}

generateDropdown();


// then to select and load...

let chosenLog;

selectDropdown.addEventListener('change', (e)=> {
  e.preventDefault();
  chosenLog = selectDropdown.value;
  console.log(chosenLog);
  recall(chosenLog);
});





// =============================================


let currentSetup = {}; // current CameraSetup

// create a setup, then set currentSetup to that.
// creating as separate allows to switch back and forth.

let cameraSetup = document.querySelector('#cameraSetup');

// let setupCount = 1;

cameraSetup.addEventListener('submit', (e)=> {
  e.preventDefault();
  let lens = document.querySelector('#lens');
  let iso = document.querySelector('#iso');
  let fstop = document.querySelector('#fstop');
  let cs = new CameraSetup(lens.value,iso.value,fstop.value);
  console.log(cs);
  currentSetup = cs;
});

// =====================
function logIt(scene,shot,take){
  let x = new Take(currentSetup,scene,shot,take);
  log.addTake(x);
  return "Take Logged";
}

// ============================================

//log a scene

let takeInfo = document.querySelector('#takeInfo');
let scene = document.querySelector('#scene');
let shot = document.querySelector('#shot');
let take = document.querySelector('#take');

takeInfo.addEventListener('submit', (e)=> {
  e.preventDefault();
  logIt(scene.value,shot.value,take.value);
  take.value ++;
  log.print();
});

// =============================
// save the log.

let saveButton = document.querySelector('#save-button');
saveButton.addEventListener('click', (e)=> {
  e.preventDefault();
  log.store();
  generateDropdown(); //re-generate dropdown options.
});

// =============================
// print the log to the page

let logTable = document.querySelector('#takeLog');
let printButton = document.querySelector('#print-button');
printButton.addEventListener('click', (e)=> {
  e.preventDefault();
  log.print();
  console.log(chosenLog);

});
