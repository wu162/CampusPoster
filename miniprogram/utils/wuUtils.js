function seqNumber(start,end){
  var arr=new Array();
  var i = 0;
  do{
    arr[i] = start;
    i=i+1;
    start = start+1;
  } while (start < end);
  return arr;
}

function isLeapYear(year) 
  {
  return year % 400 ? (year % 100 ? (year % 4 ? (false) : (true)) : (false)) : true;
}

function dayOfMonth(year, month)
{
  return 31 - ((month == 2) ? (3 - isLeapYear(year)) : ((month - 1) % 7 % 2));
}

module.exports = {
  seqNumber: seqNumber,
  dayOfMonth: dayOfMonth
}