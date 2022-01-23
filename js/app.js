//warn and confirm before close or refresh
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
});

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
    log = JSON.parse(stored);
    console.log(`${saved} loaded`);
  } else {
    console.log('no log found with that name');
  }
}
// =============================================


let currentSetup = ""; // current CameraSetup

// create a setup, then set currentSetup to that.
// creating as separate allows to switch back and forth.



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
});

// =============================
// save the log.

let saveButton = document.querySelector('#save-button');
saveButton.addEventListener('click', (e)=> {
  e.preventDefault();
  log.store();
});
