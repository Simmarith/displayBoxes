//Initialisation
$('head').append('<link rel="stylesheet" href="css/' + config.style + '.css" media="screen" title="no title" charset="utf-8">');
$(document).ready(function() {
  if (config.dbConnection) {
    //TODO:dbInit and dbInterpret
  } else {
    config.noDBBoxes.map(function (boxConf, boxNr) {
      //Set unset properties to default
      ['updateFreq'].map(function (attribute) {
        if (!(boxConf.hasOwnProperty(attribute))) {
          boxConf[attribute] = config.defaults[attribute];
        }
      });
      boxConf.counter = 0;
      $('.boxSpace').append('<div class="displayBox" boxNr="' + boxNr + '" data-row="' + boxConf.positioning.row + '" data-col="' + boxConf.positioning.col + '" data-sizex="' + boxConf.positioning.sizeX + '" data-sizey="' + boxConf.positioning.sizeY + '">' + boxConf.content + '</div>');
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
    var boxNr = $(this).attr('boxNr');
    var boxConf = config.noDBBoxes[boxNr];
    if (boxConf.hasOwnProperty('counter')) {
      boxConf.counter = boxConf.counter + config.updateTick;
      if (boxConf.counter >= boxConf.updateFreq) {
        //Specialized handling for diffrent types
        switch (config.boxTypes[boxConf.type]) {
          case 'custom':
            $(this).html(boxConf.update());
            console.log('Box ' + boxNr + ' Has been updated!');
            break;
          default:
            $(this).html('No proper Type defined!');
        }
        boxConf.counter = 0;
      }
    }
  });
}, config.updateTick * 1000);
