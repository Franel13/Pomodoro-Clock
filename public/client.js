// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html


//1.Apasam start -> porneste work-timer-ul si primeste clasa running / altfel porneste break-timer-ul daca are clasa stopped
//2.Apasam stop -> daca work-timer-ul este pornit si are clasa running se va opri si va primi clasa stopped / altfel daca break-timer-ul este pornit se va opri
//3.Apasam restart -> se vor reseta ambele timer-e
//4.Dupa terminarea work-timer-ului i se va sterge clasa running si va porni break-timer-ul care va primi clasa running
//5.Dupa terminarea

//Setting two variables to hold the time length for instantiating the timers
var work_length = $("#work_length").text();

var break_length = $("#break_length").text();


//Instantiating the timers
var work_timer = $(".work-timer").FlipClock(work_length*60, {
  autoStart: false,
  countdown: true,
  clockFace: 'MinuteCounter',
  callbacks: {
    stop: function() {
      if(work_timer.time.time === 0) {
        $(".work_timer h3").removeClass("running");
        $(".break_timer h3").addClass("running");
        break_timer.setTime(break_length*60);
        break_timer.start();
      }
    }
  }
});

var break_timer = $(".break-timer").FlipClock(break_length*60, {
  autoStart: false,
  countdown: true,
  clockFace: 'MinuteCounter',
  callbacks: {
    stop: function() {
      if(break_timer.time.time === 0) {
        $(".break_timer h3").removeClass("running");
        $(".work_timer h3").addClass("running");
        work_timer.setTime(work_length*60);
        work_timer.start();
      }
    }
  }
});


//Setting up the incrementing and decrementing buttons for timers length
$("#decrease_work").click(function() {
  work_length--;
  if(work_length === 0) {
    work_length = 1;
  }
  work_timer.stop();
  $(".work_timer h3").removeClass("running");
  $(".work_timer h3").removeClass("stopped");
  $("#work_length").text(work_length);
  work_timer.setTime(work_length*60);
});

$("#increase_work").click(function() {
  work_length++;
  work_timer.stop();
  $(".work_timer h3").removeClass("running");
  $(".work_timer h3").removeClass("stopped");
  $("#work_length").text(work_length);
  work_timer.setTime(work_length*60);
});

$("#decrease_break").click(function() {
  break_length--;
  if(break_length === 0) {
    break_length = 1;
  }
  break_timer.stop();
  $(".break_timer h3").removeClass("running");
  $(".break_timer h3").removeClass("stopped");
  $("#break_length").text(break_length);
  break_timer.setTime(break_length*60);
});

$("#increase_break").click(function() {
  break_length++;
  break_timer.stop();
  $(".break_timer h3").removeClass("running");
  $(".break_timer h3").removeClass("stopped");
  $("#break_length").text(break_length);
  break_timer.setTime(break_length*60);
});


//Setting up control buttons for work timer 
$("#start").click(function() {
  if($(".work_timer h3").hasClass("stopped")) {
    $(".work_timer h3").removeClass("stopped");
    work_timer.start();
    $(".work_timer h3").addClass("running");
  } else if($(".break_timer h3").hasClass("stopped")) {
    $(".break_timer h3").removeClass("stopped");
    break_timer.start();
    $(".break_timer h3").addClass("running");
  } else if(!($(".break_timer h3").hasClass("stopped") || $(".break_timer h3").hasClass("running"))){
    work_timer.setTime(work_length*60);
    work_timer.start();
    $(".work_timer h3").addClass("running");
  }
});

$("#stop").click(function() {
  if($(".work_timer h3").hasClass("running")) {
    $(".work_timer h3").removeClass("running");
    work_timer.stop();
    $(".work_timer h3").addClass("stopped");
  } else if($(".break_timer h3").hasClass("running")) {
    $(".break_timer h3").removeClass("running");
    break_timer.stop();
    $(".break_timer h3").addClass("stopped");
  }
});

$("#reset").click(function() {
  if($(".work_timer h3").hasClass("running") || $(".work_timer h3").hasClass("stopped")) {
    $(".work_timer h3").addClass("yellow");
  } else if($(".break_timer h3").hasClass("running") || $(".break_timer h3").hasClass("running")) {
    $(".break_timer h3").addClass("yellow");
  }
  setTimeout(function() {
    if($(".work_timer h3").hasClass("yellow")) {
      $(".work_timer h3").removeClass("yellow");
    } else if($(".break_timer h3").hasClass("yellow")) {
      $(".break_timer h3").removeClass("yellow");
    }
  }, 150);
  work_timer.stop();
  work_timer.setTime(work_length*60);
  $(".work_timer h3").removeClass("running");
  $(".work_timer h3").removeClass("stopped");
  break_timer.stop();
  break_timer.setTime(break_length*60);
  $(".break_timer h3").removeClass("running");
  $(".break_timer h3").removeClass("stopped");
});
