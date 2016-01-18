//Initialisation
$('head').append('<link rel="stylesheet" href="css/' + config.style + '.css" media="screen" title="no title" charset="utf-8">');
$(document).ready(function() {
  if (config.dbConnection) {
    //TODO:dbInit and dbInterpret
  } else {
    config.noDBBoxes.map(function (boxConf, boxNr) {
      //Set unset properties to default
      ['updateFreq', 'state'].map(function (attribute) {
        if (!(boxConf.hasOwnProperty(attribute))) {
          boxConf[attribute] = config.defaults[attribute];
        }
      });
      boxConf.counter = 0;
      $('.boxSpace').append('<div class="displayBox ' + config.states[boxConf.state] + '" boxNr="' + boxNr + '" data-row="' + boxConf.positioning.row + '" data-col="' + boxConf.positioning.col + '" data-sizex="' + boxConf.positioning.sizeX + '" data-sizey="' + boxConf.positioning.sizeY + '">' + boxConf.content + '</div>');
    })
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
  $('.displayBox').map(function () {
    var boxhtml = this;
    var boxNr = $(boxhtml).attr('boxNr');
    var boxConf = config.noDBBoxes[boxNr];
    if (boxConf.hasOwnProperty('counter')) {
      boxConf.counter = boxConf.counter + config.updateTick;
      if (boxConf.counter >= boxConf.updateFreq) {
        update(boxNr);
      }
    }
  });
}, config.updateTick * 1000);

function update(boxNr) {
  var boxConf = config.noDBBoxes[boxNr];
  var boxhtml = $('.displayBox[boxNr="' + boxNr + '"]');
  switch (config.boxTypes[boxConf.type]) {
    case 'custom':
      var updatedInfo = boxConf.update();
      boxConf.content = updatedInfo[0];
      boxConf.state = updatedInfo[1];
      $(boxhtml).html(boxConf.content);
      console.log('Box ' + boxNr + '(custom) Has been updated!');
      break;
    case 'slides':
      if (boxConf.hasOwnProperty('currentSlide')) {
        boxConf.currentSlide = boxConf.currentSlide + 1;
        if (boxConf.currentSlide >= boxConf.slides.length) {
          boxConf.currentSlide = 0;
        }
      } else {
        boxConf.currentSlide = 0;
      }
      if (boxConf.slides[boxConf.currentSlide].hasOwnProperty('updateFreq')) {
        boxConf.updateFreq = boxConf.slides[boxConf.currentSlide].updateFreq;
      } else {
        boxConf.updateFreq = config.defaults.updateFreq;
      }
      var updatedInfo = boxConf.slides[boxConf.currentSlide].update();
      boxConf.content = updatedInfo[0];
      boxConf.state = updatedInfo[1];
      $(boxhtml).html(boxConf.content);
      console.log('Box ' + boxNr + '(slides) Has been updated(slideNr:' + boxConf.currentSlide + ')!');
      break;
    default:
      $(boxhtml).html('No proper Type defined!');
  }
  //Update css class for state
  config.states.map(function (stateName) {
    $(boxhtml).removeClass(stateName);
  });
  $(boxhtml).addClass(config.states[boxConf.state]);
  boxConf.counter = 0;
}

//Go to previous/next slide via arrow keys
window.onkeydown = function (e) {
  //forwards
  if (e.keyCode == '39') {
    config.noDBBoxes.map(function(boxConf, boxNr) {
        if (config.boxTypes[boxConf.type] == 'slides') {
          update(boxNr);
        }
    }); 
  }
  //back
  if (e.keyCode == '37') {
    config.noDBBoxes.map(function(boxConf, boxNr) {
        if (config.boxTypes[boxConf.type] == 'slides') {
          if ((!(boxConf.hasOwnProperty('currentSlide'))) || (boxConf.currentSlide == 0)) {
            boxConf.currentSlide = boxConf.slides.length - 2;
          } else {
            boxConf.currentSlide = boxConf.currentSlide - 2;
          }
            update(boxNr);
        }
    }); 
  }
}