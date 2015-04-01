//objectid.ts
//
if (!document) {
  var document = { cookie: '' }; // fix crashes on node
  //
}
var increment = Math.floor(Math.random() * (16777216));
var pid = Math.floor(Math.random() * (65536));
var machine = Math.floor(Math.random() * (16777216));
//
var setMachineCookie = () => {
  var cookieList = document.cookie.split('; ');
  for (var i in cookieList) {
    var cookie = cookieList[i].split('=');
    var cookieMachineId = parseInt(cookie[1], 10);
    if (cookie[0] == 'mongoMachineId' && cookieMachineId && cookieMachineId >= 0 && cookieMachineId <= 16777215) {
      machine = cookieMachineId;
      break;
    }
  }
  document.cookie = 'mongoMachineId=' + machine + ';expires=Tue, 19 Jan 2038 05:00:00 GMT;path=/';
};
//
if (typeof (localStorage) != 'undefined') {
  try {
    var mongoMachineId = parseInt(localStorage['mongoMachineId']);
    if (mongoMachineId >= 0 && mongoMachineId <= 16777215) {
      machine = Math.floor(localStorage['mongoMachineId']);
    }
    // Just always stick the value in.
    localStorage['mongoMachineId'] = machine;
  } catch (e) {
    setMachineCookie();
  }
}
else {
  setMachineCookie();
}

//
class ObjectId {
  //
  public timestamp: number = null;
  public machine: number = null;
  public pid: number = null;
  public increment: number = null;
  constructor(arg0?: any, arg1?: any, arg2?: any, arg3?: any) {
    if (typeof (arg0) == 'object') {
      this.timestamp = arg0.timestamp;
      this.machine = arg0.machine;
      this.pid = arg0.pid;
      this.increment = arg0.increment;
    }
    else if (typeof (arg0) == 'string' && (arg0.length == 24)) {
      this.timestamp = Number('0x' + arg0.substr(0, 8)),
      this.machine = Number('0x' + arg0.substr(8, 6)),
      this.pid = Number('0x' + arg0.substr(14, 4)),
      this.increment = Number('0x' + arg0.substr(18, 6))
        }
    else if ((arg0 !== undefined) && (arg1 !== undefined) &&
      (arg2 !== undefined) && (arg3 !== undefined) && (arguments[0] !== null)) {
      this.timestamp = arg0;
      this.machine = arg1;
      this.pid = arg2;
      this.increment = arg3;
    }
    else {
      this.timestamp = Math.floor(new Date().valueOf() / 1000);
      this.machine = machine;
      this.pid = pid;
      this.increment = increment++;
      if (increment > 0xffffff) {
        increment = 0;
      }
    }
  }// constructor
  public getDate(): Date {
    return new Date(this.timestamp * 1000);
  }
  public toString(): string {
    if (this.timestamp === undefined
      || this.machine === undefined
      || this.pid === undefined
      || this.increment === undefined) {
      return 'Invalid ObjectId';
    }
    var ts = this.timestamp.toString(16);
    var m = this.machine.toString(16);
    var p = this.pid.toString(16);
    var i = this.increment.toString(16);
    return '00000000'.substr(0, 8 - ts.length) + ts +
      '000000'.substr(0, 6 - m.length) + m +
      '0000'.substr(0, 4 - p.length) + p +
      '000000'.substr(0, 6 - i.length) + i;
  }// toString
  public toArray(): number[] {
    var strOid = this.toString();
    var array = [];
    var i;
    for (i = 0; i < 12; i++) {
      array[i] = parseInt(strOid.slice(i * 2, i * 2 + 2), 16);
    }
    return array;
  }// toArray
}// class ObjectId
export = ObjectId;
