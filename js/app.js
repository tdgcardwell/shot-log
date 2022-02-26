let log; // we're either starting a new one, or loading one.

//New Log
let newButton = document.querySelector('#new-button');
newButton.addEventListener('click', (e)=> {
  e.preventDefault();
  log = new Log(prompt('Project Name'),prompt('Direcor Name'),prompt('DoP'));
  console.log(`Project Log created`);
  log.store();
  generateDropdown(); //re-generate dropdown options.
  log.print(); //load this one on the page.
});


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
    log.print(); //load this one on the page.
    setups = log.setups;
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

        // console.log(`${key}: ${localStorage[key]}`);
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
  countSetups();
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

// =============================
// setup dropdown

let setupDropdown = document.querySelector('#select-setup')

// only gonna get called after checking if there are setups.
function generateSetupDropdown() {
  let options = `<option value="">Previous Setups`;
  setupDropdown.innerHTML = options;

  // iterate over saved setups
  for (const key in localStorage) {

    // console.log('code here to generate setup dropdown');

  }

  setupDropdown.innerHTML = options;
}




// =====================
function logIt(scene,shot,take,note){
  let x = new Take(currentSetup,scene,shot,take,note);
  log.addTake(x);
  return "Take Logged";
}

// ============================================

//log a take

let takeInfo = document.querySelector('#takeInfo');
let scene = document.querySelector('#scene');
let shot = document.querySelector('#shot');
let take = document.querySelector('#take');
let note = document.querySelector('#note');

takeInfo.addEventListener('submit', (e)=> {
  e.preventDefault();
  logIt(scene.value,shot.value,take.value,note.value);
  take.value ++;
  log.print();
  log.store();
  generateDropdown(); //re-generate dropdown options.
});

// =============================
// save the log.

// let saveButton = document.querySelector('#save-button');
// saveButton.addEventListener('click', (e)=> {
//   e.preventDefault();
//   log.store();
//   generateDropdown(); //re-generate dropdown options.
// });

// =============================
// print the log to the page

let logTable = document.querySelector('#takeLog');
let printButton = document.querySelector('#print-button');



// =============================
// update take/shot if shot/scene change.

//reset fields when changing shot
shot.addEventListener('change' , (e) => {
  take.value = 1;
})

//reset take when changing scene
scene.addEventListener('change' , (e) => {
  shot.value = '';
  take.value = 1;
})
