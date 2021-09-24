//var Request = require("request");
export function getNowTime(){
  let hour = new Date().getHours();
  let minutes = new Date().getMinutes();
  let hourNow = `${hour}h : ${minutes}min`;

  return hourNow; 
}
