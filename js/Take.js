class Take {
  constructor(camera,scene,shot,take,note){
    this.scene = scene;
    this.shot = shot;
    this.take = take;
    this.camera = camera;
    this.note = note;
    this.mark = false;

    const date = new Date();
    const hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes<10){
      minutes = `0${minutes}`;
    }
    const day = date.getDate();
    let month = date.getMonth();
    month += 1; // to adjust for starting at 0.
    if (month<10){
      month = `0${month}`;
    }
    const year = date.getFullYear();
    this.dateTime = `${year}.${month}.${day} - ${hours}:${minutes}`;

    // this._notes = [];
  }


  // get notes(){
  //   return this._notes;
  // }
  //
  // set notes(note){
  //   this._notes.push(note);
  // }

}
