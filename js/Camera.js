class CameraSetup {
  constructor(lens,iso,fstop){
    this.lens = lens;
    this.iso = iso;
    this.fstop = fstop;
    this._notes = [];
  }


  get notes(){
    return this._notes;
  }

  set notes(note){
    this._notes.push(note);
  }

}
