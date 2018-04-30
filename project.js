$( document ).ready(function() {
  // function move() {
  // var parent = element.parentNode;
  // var parent = $(this).parent().get(0);
  // var parent = event.target; //correct, get the button
  // alert(parent.tagName);
  // var p = parent.parentNode; //correct, get the outer div
  // alert(p.tagName);
  // var e = p.children;
  // alert(e.tagName);
  // var elem = e[0];
  // alert(elem.tagName);
  // var width = 0;
  // var id = setInterval(frame, 100);
  // function frame() {
  //   if (width >= 100) {
  //     clearInterval(id);
  //   } else {
  //     width++; 
  //     elem.style.width = width + '%'; 
  //     elem.innerHTML = width * 1  + '%';
  //   }
  // }
//   alert("lel");
// }

    var dialog, form,
 
      
      name = $( "#name" ),
      time = $( "#time" ),
      descrip = $( "#descrip" ),
      allFields = $( [] ).add( name ).add( time ).add( descrip ),
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
        var test = $('<div/>',{});
        test.addClass("myProgress");
        var test2 = $('<div/>',{});
        test2.addClass("myBar");
        test.append(test2);
        var btn = $('<button/>',
    {
        text: 'Start',
        value: 'start',
        click: function (event) {
          // alert(event.target.parentNode.tagName);
          var elem = event.target.parentNode.firstChild;
          // var width = event.element.width;
          var width = 0;
          if(event.target.value=='start'){
          	// alert("mf");
            var id = setInterval(frame,10000);
          function frame() {
            if (width >= 100) {
              clearInterval(id);
            } else {
              width++; 
              elem.style.width = width + "%"; 
              elem.innerHTML = width * 1  + '%';
            }
          } 
          event.target.value='pause';
          event.target.innerHTML="Stop";
          }
          else{
            event.target.value='start';
            event.target.innerHTML="Start";
            var current = elem.style.width;
            var temp = elem.innerHTML;
            elem.style.width = current;
            elem.style.innerHTML = temp;
          }
          
       }
    });
        btn.addClass("start-task");
        test.append(btn);
        $("#users-contain").append(test);

  //       $("#users-contain").append('<div class="myProgress">'+
  //   '<div class="myBar"></div>'+
  // '<button type="button" class="start-task">Click Me</button>'+
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