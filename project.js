// function newForm(){

//     // Get the modal
//     var modal = document.getElementById('myModal');

//     // Get the button that opens the modal
//     var btn = document.getElementById("myBtn");

//     // Get the <span> element that closes the modal
//     var span = document.getElementsByClassName("close")[0];

//     // When the user clicks the button, open the modal 
//     btn.onclick = function() {
//         modal.style.display = "block";
//     }

//     // When the user clicks on <span> (x), close the modal
//     span.onclick = function() {
//         modal.style.display = "none";
//     }

//     // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function(event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//         }
//     }
// }

// fuction addNewElement(){
//     var newDiv = document.createElement("div");
//     var newChild = 
//     document.body.appendChild(div);
// }

$(document).ready(function() {
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

  $( function() {
    var dialog, form,
 
      // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
      // emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      name = $( "#name" ),
      time = $( "#time" ),
      descrip = $( "#descrip" ),
      allFields = $( [] ).add( name ).add( time ).add( descrip ),
      tips = $( ".validateTips" );
 
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
      valid = valid && checkLength( name, "username", 3, 16 );
      // valid = valid && checkLength( time, "time", 6, 80 );
      // valid = valid && checkLength( descrip, "descrip", 5, 16 );
 
      // valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      // valid = valid && checkRegexp( time, emailRegex, "eg. 340" );
 
      if ( valid ) {
        // $( "#users tbody" ).append( "<tr>" +
        //   "<td>" + name.val() + "</td>" +
        //   "<td>" + time.val() + "</td>" +
        //   "<td>" + descrip.val() + "</td>" +
        // "</tr>" );
        $("#users-contain").append("<div class=\"events.\"> <h3>"+name.val()+"</h3> </div>");
        $("#users-contain").append('<div class="light-grey">'+
    '<div id="myBar"  style="height:24px;width:0"></div>'+
  '</div>'+
  '<br>'+
  '<button class="start-task" onclick="move()">Click Me</button>' );
        dialog.dialog( "close" );
      }
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
      addUser();
    });
 
    $( "#create-user" ).button().on( "click", function() {
      dialog.dialog( "open" );
    });
  } );
