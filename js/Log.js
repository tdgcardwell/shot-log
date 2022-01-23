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
    localStorage.setItem(`${this.project}-log`, JSON.stringify(this));
    console.log(`saved as ${this.project}-log`);
  }

}
