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

  print(){
    /*
    for each take add a row to the table
    */
    logTable.innerHTML=''; //reset it first.
    for (let i=0; i<this.takes.length; i++) {
      logTable.innerHTML+= `<tr>
                            <td>${this.takes[i].scene}</td>
                            <td>${this.takes[i].shot}</td>
                            <td>${this.takes[i].take}</td>
                            <td>${this.takes[i].dateTime}</td>
                            <td>${this.takes[i].camera.lens}</td>
                            <td>${this.takes[i].camera.iso}</td>
                            <td>${this.takes[i].camera.fstop}</td>
                            </tr>`;
    }

  }

}
