/*

A Way to Export the log data as CSV, so that it can be imported into Davinci Resolve.

*/

// =============================================

let exportDropdown = document.querySelector('#export-select')

function generateDropdown() {
  let options = `<option value="">Choose Log</option>`;
  exportDropdown.innerHTML = options;

  for (const key in localStorage) {

    // make sure darkMode isn't there as a log to load!!
    if (localStorage.hasOwnProperty(key) && key != "darkMode" ) {

        // console.log(`${key}: ${localStorage[key]}`);
        options += `<option value="${key}">${key}</option>`;

    }
  }

  exportDropdown.innerHTML = options;
}

generateDropdown();

// then to select and load...
let dataString;

exportDropdown.addEventListener('change', (e)=> {
  e.preventDefault();
  let which = exportDropdown.value;
  // console.log(which);
  let stored = localStorage.getItem(which);
  if (stored) {
    let chosenLog= JSON.parse(stored);
    let takes = chosenLog['takes'];
    // console.log(takes);

    dataString = "File Name,Scene,Shot,Take,Description,Good Take\n"

    // eventually I'll figure best way to implement file names, and include that too.

    for (var i = 0; i < takes.length; i++) {
      let take = takes[i];
      let instance ="";

      if (take.filename){
        instance += take.filename;
      }

      instance += ',' + take.scene + ',' + take.shot + ',' + take.take + ',';

      if (take.note){
        instance += take.note;
      }
      instance += ','; //still need this comma, even if no note.

      if (take.mark){
        instance += '1'; //DVR seems to want a '1' vs 'true' here.
      }

      dataString += instance;
      dataString += '\n'
    }

  }

});


// this bit needs FileSaver
// https://github.com/eligrey/FileSaver.js
function downloadMetadata(){
  var blob = new Blob([dataString], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "metadata.csv");
}

let downloadBtn = $("#downloadBtn")
downloadBtn.click(downloadMetadata);


// follow instructions on p. 355 of Resolve Manual for importing metadata.
