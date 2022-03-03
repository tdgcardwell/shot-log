class Log{
  constructor(project,dir,cam) {
    this.project = project;
    this.director = dir;
    this.camera = cam;
    this.takes = [];
  }


  addTake(take){
    this.takes.push(take);
  }

  store(){
    this.setups = setups;
    localStorage.setItem(`${this.project}-log`, JSON.stringify(this));
    console.log(`saved as ${this.project}-log`);
  }

  import(project,JSON){
    localStorage.setItem(`${project}-log`, JSON);
  }

  print(){

    //update project header details.
    let proj = document.querySelector('#proj');
    proj.textContent = this.project;

    let dir = document.querySelector('#dir');
    dir.textContent = this.director;

    let dop = document.querySelector('#dop');
    dop.textContent = this.camera;

    /*
    for each take add a row to the table
    */
    logTable.innerHTML=''; //reset it first.
    for (let i=0; i<this.takes.length; i++) {

      let isItChecked;
      let markedClass;
      let isItMarked = this.takes[i].mark;
      if (isItMarked){
        isItChecked = "checked";
        markedClass = 'class="marked"';
      }else{
        isItChecked = "";
        markedClass = "";
      }
      logTable.innerHTML+= `<tr ${markedClass}>
                            <td class="tScene">${this.takes[i].scene}</td>
                            <td class="tShot">${this.takes[i].shot}</td>
                            <td class="tTake">${this.takes[i].take}</td>
                            <td class="tDate">${this.takes[i].dateTime}</td>
                            <td class="tLens">${this.takes[i].camera.lens}</td>
                            <td class="tIso">${this.takes[i].camera.iso}</td>
                            <td class="tFstop">${this.takes[i].camera.fstop}</td>
                            <td class="tNote">${this.takes[i].note}</td>
                            <td class="tMark"><input type="checkbox" name="" value="${i}" ${isItChecked}></td>
                            </tr>`;
    }

  }

}
