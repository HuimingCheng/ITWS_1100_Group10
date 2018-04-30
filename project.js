$( document ).ready(function() {
	var time_h = prompt("For how many hours are you free?:", "Enter number of hours here");
    var time_m = prompt("For how many minutes are you free?:", "Enter number of minutes here");
    var time_to_use = (time_h * 3600) + (time_m * 60);

    var display2 = document.querySelector('#time2'),
    timer2 = new CountDownTimer(time_to_use);

    timer2.onTick(format(display2)).start();

    function format(display) {
        return function (minutes, seconds) {
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = minutes + ':' + seconds;
        };
    }

    var dialog, form,
 
      
      name = $( "#name" ),
      hour = $( "#hour" ),
      minute = $('#minute'),
      // time = $( "#time" ),
      descrip = $( "#descrip" ),
      allFields = $( [] ).add( name ).add( hour ).add(minute).add( descrip ),
      tips = $( ".validateTips" );
      var count = 0;
      

    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
 
    function checkLength( o, n, min, max ) {
      if ( parseInt(o.val()) > max || parseInt(o.val()) < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
          min + " and " + max + "." );
        return false;
      } else {
        return true;
      }
    }
 
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
 
    function addUser() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
      tasks = document.getElementById("users-contain");
      // valid = valid && checkLength( name, "username", 3, 16 );
      // valid = valid && checkLength( time, "time", 6, 80 );
      // valid = valid && checkLength( descrip, "descrip", 5, 16 );
 
      // valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      // valid = valid && checkRegexp( time, emailRegex, "eg. 340" );

        $("#users-contain").append("<div class=\"events.\"> <h3>"+name.val()+"</h3> </div>");
        var timer;
        var test = $('<div/>',{});
        test.addClass("myProgress");
        var test2 = $('<div/>',{});
        test2.addClass(name.val());
        test2.addClass("myBar");
        test.append(test2);
        var h = parseInt(hour.val())*3600;
      var m = parseInt(minute.val())*60;
      var duration = 1000*(h+m);
      
        var btn = $('<button/>',
    {
        text: 'Start',
        value: '.'+name.val(),
        click: function (event) {
          // alert(event.target.parentNode.tagName);
          var elem = event.target.parentNode.firstChild;
          // var width = event.element.width;
          var wid = 0;
          var na = event.target.value;
          if(event.target.innerHTML=='Start'){
          	// alert(na);
          	$(na).animate( { width: "100%" },duration);
          	// alert("mf");
            // var id = setInterval(frame,10000);
          // function frame() {
          //   if (width >= 100) {
          //     clearInterval(id);
          //   } else {
          //     width++; 
          //     elem.style.width = width + "%"; 
          //     elem.innerHTML = width * 1  + '%';
          //   }
          // } 
          // event.target.value='pause';
          event.target.innerHTML="Stop";
          }
          else{
            // event.target.value='start';
            event.target.innerHTML="Start";
            $(na).stop();
            // var current = elem.style.width;
            // var temp = elem.innerHTML;
            // elem.style.width = current;
            // elem.style.innerHTML = temp;
          }
    //       function Horloge(maxWidth) {
    // 		var w = elem.width();
    // 		var percent = parseInt((w * 100) / maxWidth);
    // 		$('#log').html(percent + ' %');
		  // }
          
       }
    });
        btn.addClass("start-task");
        test.append(btn);
        $("#users-contain").append(test);

  //       $("#users-contain").append('<div class="myProgress">'+
  //   '<div class="myBar"></div>'+
  // '<button type="button" class="start-task" >Click Me</button>'+
  //   '</div>' );
        dialog.dialog( "close" );
      // }
      return valid;
    }
 
    dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 400,
      width: 350,
      modal: true,
      buttons: {
        "Create a task": addUser,
        Cancel: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
        allFields.removeClass( "ui-state-error" );
      }
    });
 
    form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      count=addUser(count);
    });
 
    $( "#create-user" ).button().on( "click", function() {
      dialog.dialog( "open" );
    });

    //The function used to select the corresponding div to increment
  function showIt(element) {
    var parent = element.parentNode;
    alert(parent.id);
    var content = parent.querySelector("div");
    alert(content.id);
  }
});
window.onload = function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = addingZerosToNumbers(m);
    s = addingZerosToNumbers(s);
    document.getElementById('worldClock').innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);  
}

function CountDownTimer(duration, granularity) {
  this.duration = duration;
  this.granularity = granularity || 1000;
  this.tickFtns = [];
  this.running = false;
};

CountDownTimer.prototype.start = function() {
  if (this.running) {
    return;
  }
  this.running = true;
  var start = Date.now(),
      that = this,
      diff, obj;

  (function timer() {
    diff = that.duration - (((Date.now() - start) / 1000) | 0);

    if (diff > 0) {
      setTimeout(timer, that.granularity);
    } else {
      diff = 0;
      that.running = false;
    }

    obj = CountDownTimer.parse(diff);
    that.tickFtns.forEach(function(ftn) {
      ftn.call(this, obj.minutes, obj.seconds);
    }, that);
  }());
};

CountDownTimer.prototype.onTick = function(ftn) {
  if (typeof ftn === 'function') {
    this.tickFtns.push(ftn);
  }
  return this;
};

CountDownTimer.prototype.expired = function() {
  return !this.running;
};

CountDownTimer.parse = function(seconds) {
  return {
    'minutes': (seconds / 60) | 0,
    'seconds': (seconds % 60) | 0
  };
};

function addingZerosToNumbers(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
};
