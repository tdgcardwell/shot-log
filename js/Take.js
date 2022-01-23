class Take {
  constructor(camera,scene,shot,take){
    this.scene = scene;
    this.shot = shot;
    this.take = take;
    this.camera = camera;
    this.sync = true;

    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    let month = date.getMonth();
    month += 1; // to adjust for starting at 0.
    const year = date.getFullYear();
    this.dateTime = `${hours}:${minutes} - ${year}.${month}.${day}`;

    this._notes = [];
  }


  get notes(){
    return this._notes;
  }

  set notes(note){
    this._notes.push(note);
  }

}
