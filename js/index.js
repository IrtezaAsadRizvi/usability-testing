$(document).ready(function() {
  $('#play-video').on('click', function(ev) {
    // starting the videos
    $("#video1")[0].src += "&autoplay=1";
    $("#video2")[0].src += "&autoplay=1";
    $("#video3")[0].src += "&autoplay=1";
    ev.preventDefault();
  });
});

// stopwatch
var container = document.getElementsByClassName('container');
[].forEach.call(container,function(s){
  var current = 0,
  interval = 0,
  hrCount = 0,
  lastUpdate = new Date().getTime(),
  start = s.querySelector('a.start'),
  reset = s.querySelector('a.reset'),
  min = s.querySelector('span.minutes'),
  hr = s.querySelector('span.hours'),
  sec = s.querySelector('span.seconeds'),
  millsec = s.querySelector('span.millisec');
  var count = 0
  start.addEventListener('click', function(){
    count++
    if(count % 2 == 1) {
      startTimer()
      start.innerHTML = '<i class="fa fa-pause-circle" aria-hidden="true"></i>'
    }
    if(count % 2 == 0) {
      stopTimer()
      start.innerHTML = '<i class="fa fa-play-circle" aria-hidden="true"></i>'
    }
  });
  reset.addEventListener ('click',resetTimer);
  function pad(n){
     return ('00'+n).substr(-2);
  }
  function update (){
    var now = new Date().getTime(),
    changeTime = now - lastUpdate;
    current += changeTime;
    var time = new Date(current);
    min.innerHTML = pad(time.getMinutes());
    hr.innerHTML = '00';
    sec.innerHTML = pad(time.getSeconds());
    millsec.innerHTML = pad(Math.floor(time.getMilliseconds()/10));
    lastUpdate = now;
  }
  function startTimer(){
    if(!interval){
      lastUpdate = new Date().getTime();
      interval = setInterval(update,1);
      hourInterval = setInterval(function () {
        hrCount++;
        if (hrCount < 10) {
          hr.innerHTML = '0'+ hrCount.toString();
        }
        hr.innerHTML = hrCount.toString();
      },3600000);
    }
  }
  function stopTimer(){
    clearInterval(interval);
    interval = 0;
  }
  function resetTimer(){
    stopTimer();
    current = 0;
    hr.innerHTML = min.innerHTML = sec.innerHTML = millsec.innerHTML = pad(0);
  }
});

// date and time
var d = new Date(),
     minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
     hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
     ampm = d.getHours() >= 12 ? 'PM' : 'AM',
     months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
     days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

 document.getElementById("time").innerHTML = days[d.getDay()]+' '+d.getDate()+' '+months[d.getMonth()]+' &nbsp;&nbsp;'+hours+':'+minutes+ampm;

 setInterval(function(){
   document.getElementById("time").innerHTML = days[d.getDay()]+' '+d.getDate()+' '+months[d.getMonth()]+' &nbsp;&nbsp;'+hours+':'+minutes+ampm;
 }, 5000);
