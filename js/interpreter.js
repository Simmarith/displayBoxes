//Initialisation
//Get all classes files
['classes/CustomBox.class.js', 'classes/DisplayBox.class.js', 'classes/SlidesBox.class.js'].map(function(path) {
    $('head').append('<script src="' + path + '" charset="utf-8"></script>');
});
$('head').append('<link rel="stylesheet" href="css/' + config.style + '.css" media="screen" title="no title" charset="utf-8">');
//all boxes
var boxes = [];
$(document).ready(function() {
  if (config.dbConnection) {
    //TODO:dbInit and dbInterpret
  } else {
    config.noDBBoxes.map(function (boxConf, boxNr) {
      switch (config.boxTypes[boxConf.type]) {
        case 'custom':
          boxes[boxNr] = new CustomBox(boxNr, boxConf, $('.boxSpace'));
          break;
        
        case 'slides':
          boxes[boxNr] = new SlidesBox(boxNr, boxConf, $('.boxSpace'));
          break;
        
        default:
          console.log('BoxType for box nr:' + boxNr + ' not found!');
      }
    });
  }
  var gridster = $('.boxSpace').gridster({
    widget_selector:'.displayBox',
    min_cols:16,
    min_rows:9,
    widget_base_dimensions:[($(window).width() / 16) - 35, ($(window).height() / 9) - 22],
    widget_margins:[15,15],
      resize: {
        enabled: true
      }
  });
});
//Maintanance
setInterval(function () {
  boxes.map(function (boxObj) {
    if (boxObj.hasOwnProperty('counter')) {
      boxObj.counter = boxObj.counter + config.updateTick;
    } else {
      boxObj.counter = config.updateTick;
    }
    if (boxObj.counter >= boxObj.updateFreq) {
      update(boxObj.boxNr);
    }
  });
}, config.updateTick * 1000);

function update(boxNr) {
  var boxObj = boxes[boxNr];
  boxObj.update();
  boxObj.counter = 0;
}

//Go to previous/next slide via arrow keys
window.onkeydown = function (e) {
  //forwards
  if (e.keyCode == '39') {
    boxes.map(function(boxObj) {
        if (boxObj instanceof SlidesBox) {
          update(boxObj.boxNr);
        }
    }); 
  }
  //backwards
  if (e.keyCode == '37') {
    boxes.map(function(boxObj) {
        if (boxObj instanceof SlidesBox) {
          if (boxObj.currentSlide == 0) {
            boxObj.currentSlide = boxObj.slides.length - 2;
          } else {
            boxObj.currentSlide = boxObj.currentSlide - 2;
          }
            update(boxObj.boxNr);
        }
    }); 
  }
}