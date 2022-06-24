let log; // we're either starting a new one, or loading one.

//New Log
let newButton = document.querySelector('#new-button');
newButton.addEventListener('click', (e)=> {
  e.preventDefault();
  log = new Log(prompt('Project Name'),prompt('Director Name'),prompt('DoP'));
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
    listify(perPage.value)
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
  if (log){
    let lens = document.querySelector('#lens');
    let iso = document.querySelector('#iso');
    let fstop = document.querySelector('#fstop');
    let cs = new CameraSetup(lens.value,iso.value,fstop.value);
    console.log(cs);
    currentSetup = cs;
  } else {
    alert('Load or Create a Log first!')
  }
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
  if (log){
    logIt(scene.value,shot.value.toUpperCase(),take.value,note.value);
    take.value ++;
    log.print();
    listify(perPage.value)
    log.store();
    generateDropdown(); //re-generate dropdown options.
    note.value = ''; //clear notes.
  } else {
    alert('Load or Create a Log first!')
  }
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
shot.addEventListener('input' , (e) => {
  take.value = 1;
})

//reset take when changing scene
scene.addEventListener('input' , (e) => {
  shot.value = '';
  take.value = 1;
})


// =============================
// remove a log
function remove(saved){

  let stored = localStorage.getItem(saved);
  if (stored) {

    if (confirm(`Are you sure you wanna do that? ${saved} will be gone forever.`)) {

      localStorage.removeItem(saved);
      console.log('removed');

    } else {
      console.log('aborted');
    }

  } else {
    console.log('no log found with that name');
  }
}

let removeButton = document.querySelector('#remove-button');
removeButton.addEventListener('click', (e)=> {
  e.preventDefault();
  let logToRemove = selectDropdown.value;
  remove(logToRemove);
  generateDropdown(); //re-generate dropdown options.

});

// ================= list.js

function listify(x=10,y=true){
  var options = {
    valueNames: [ 'tScene', 'tShot', 'tTake', 'tDate', 'tLens', 'tIso', 'tFstop', 'tNote' ],
    page: x,
    pagination: y
  };
  var takeList = new List('tLog', options);
}


let perPage = document.querySelector('#perPage');

perPage.addEventListener('change', (e)=> {
  e.preventDefault();
  let amount = perPage.value;

  log.print();
  listify(amount);

  perPage.blur(); //this is the key to making 'change' work right away.

});

// ==========


// ------ marking
$( "#takeLog").on( "click", "tr .tMark input", function() {

  let takeNumber = $(this).val();

  let thisTake = log.takes[takeNumber];

  if (thisTake.mark === false) { // if its not marked
    thisTake.mark = true; // mark it
  } else {
    thisTake.mark = false; // otherwise un-mark it.
  }

  // console.log( thisTake );
  log.store(); // save your changes.

  // now figure out immediate highlight...

  let thisRow = $(this).parents("tr");
  thisRow.toggleClass( "marked" );

  console.log(thisRow);

});


// =============================
// toggle panes.

let navTake = $('#navTake');
let navLog = $('#navLog');

let takePane = $('#takeForm');
let logPane = $('#tLog');

function switchPanes(a){
  navTake.toggleClass('active');
  navLog.toggleClass('active');

  if (!a) {
    takePane.toggle("slide", { direction: "left" } );
    logPane.toggle("slide", { direction: "right" } );
  } else {
    logPane.toggle("slide", { direction: "right" } );
    takePane.toggle("slide", { direction: "left" } );
  }

}

navTake.click(function(){
  switchPanes(true);
});

navLog.click(function(){
  switchPanes(false);
});


// =========== Menu Tray ======================

function showTray() {
  $(".underlay").addClass("underlay-on");
  $(".menu-tray").addClass("menu-tray-on");
  $("body").addClass("body-lock");
}

function hideTray() {
  $(".underlay").removeClass("underlay-on");
  $(".menu-tray").removeClass("menu-tray-on");
  $("body").removeClass("body-lock");
}

$(".hamburger").on("click", showTray);

$(".underlay").on("click", hideTray);
$(".close-out").on("click", hideTray);


// ============== Import =======================

let importInfo = document.querySelector('#importInfo');

importInfo.addEventListener('submit', (e)=> {
  e.preventDefault();

  let impProjName = document.querySelector('#impProjName');
  let impProjJSON = document.querySelector('#impProjJSON');

  let temp = new Log();
  temp.import(impProjName.value,impProjJSON.value);
  console.log(`imported as ${impProjName.value}-log`);
  generateDropdown(); //re-generate dropdown options.
  impProjName.value = "";
  impProjJSON.value = "";
  hideTray();


});

// ============= Export ================

let exportButton = document.querySelector('#export-button');
exportButton.addEventListener('click', (e)=> {
  e.preventDefault();
  let logToExport = selectDropdown.value;
  exportLog(logToExport);
});


let expProjJSON = document.querySelector('#expProjJSON');

function exportLog(saved){

  let stored = localStorage.getItem(saved);
  if (stored) {

    // console.log(stored);
    expProjJSON.value = stored;

  }
}

// Will add copy to clipboard.js at somepoint


// ------ menu sections
$( ".menu-tray ul").on( "click", "h3", function() {

  $( ".menu-tray li .menu-section").hide();
  let thisRow = $(this).parents("li");
  thisRow.find( ".menu-section" ).show();

});


// ================ attempting edit....

$( "#takeLog").on( "click", "td", makeItEditable);
$( "#takeLog" ).on( "click", "#editSave", saveTheEdit );

let globalTakeNumber = "";
let globalField = "";
let that = "";

function makeItEditable(e){
  if ( $(this).hasClass("tMark") ) {
    console.log("nope");
  } else {
    let current = $(this).text();
    globalField = $(this).attr("class");
    that = $(this);

    let whichTake = $(this).parent("tr");
    globalTakeNumber = $(whichTake).attr("data-take");

    $(this).html(`
      <input type="text" id="editField" value="${current}">
      <button type="button" id="editSave">Save</button>

      `);
    $( "#takeLog").off( "click", "td", makeItEditable); //turn off the event listener.
    $("#takeLog #editField").focus();
  }
}

function saveTheEdit(){
  $( "#takeLog").on( "click", "td", makeItEditable); //turn the event listener back on.
  let newInfo = $("#takeLog #editField").val();

  let thisTake = log.takes[globalTakeNumber];

  // console.log(thisTake);
  // console.log(globalField);
  // console.log(newInfo);

  // figure out what actual field is called
  let specificField = "";

  if (globalField == "tScene"){
    specificField = "scene";
  } else if (globalField == "tShot") {
    specificField = "shot";
  } else if (globalField == "tTake") {
    specificField = "take";
  } else if (globalField == "tDate") {
    specificField = "dateTime";
  } else if (globalField == "tLens") {
    specificField = "camera.lens";
  } else if (globalField == "tIso") {
    specificField = "camera.iso";
  } else if (globalField == "tFstop") {
    specificField = "camera.fstop";
  } else if (globalField == "tNote") {
    specificField = "note";
  }

  // console.log(specificField);

  log.takes[globalTakeNumber][specificField] = newInfo; //save the info to correct part of the take/log


  // console.log(thisTake);


  that.text(newInfo); // update the field on the display.
  log.store();


}
