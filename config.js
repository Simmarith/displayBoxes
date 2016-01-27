var config = {
  //The name of the stylesheet which modifies the boxes/background. Currently working: neon
  style:'neon',
  //Number of seconds until boxes are checked if update is needed
  updateTick:10,
  //The diffrent types of boxes you can use which will be initialized/maintained diffrently. Currently working: custom
  boxTypes: [
    'custom',
    'slides',
    'subgrid',
    'iframe'
  ],
  states: [
    'nominal',
    'warning',
    'alert',
    'normal',
    'shadow'
  ],
  //The defaults will be used for the boxes with no own property
  defaults: {
    updateFreq:120,
    update:function () {return ['No update function set!', 2]},
    state:0
  },
  //Try to get data from db (NOT IMPLEMENTED YET)
  dbConnection:false,
  //Boxes to generate if no dbConnection is present
  noDBBoxes:[
    {
      //See the types in config.boxTypes
      type:0,
      //The default html to be displayed in the displayBox
      content:'testbox1',
      //The index of the state as in config.states
      state:0,
      //Function called on refresh; return will be an array of the html to put into the box(at 0) and the index of the state(at 1)
      update:function () {return ['testbox1<br>' + Date(), 0]},
      //how long to wait until next update in seconds
      updateFreq:10,
      positioning: {
        //width of box
        sizeX:8,
        //height of box
        sizeY:4,
        row:1,
        col:1
      }
    },
    {
      type:0,
      content:'testbox2',
      update:function () {return ['testbox2<br>' + Date(), 1]},
      state:1,
      updateFreq:10,
      positioning: {
        sizeX:8,
        sizeY:4,
        row:1,
        col:9
      }
    },
    {
      //See the types in config.boxTypes
      type:2,
      update:function (boxObj) { /* Handling for the subboxes */ },
      //State shadow as we don't want a border around the subboxes
      state:4,
      //how long to wait until next update in seconds
      updateFreq:10,
      //number of rows of the subgrid
      rows:2,
      //number of columns of the subgrid
      cols:2,
      //Array of subboxes generated on startup
      subboxes: [
        {
          //Html to be displayed in the subbox
          content:'Testsubbox1',
          state:0,
          positioning: {
            sizeX:1,
            sizeY:1,
            row:1,
            col:1
          }
        },
        {
          content:'Testsubbox2',
          state:1,
          positioning: {
            sizeX:1,
            sizeY:1,
            row:1,
            col:2
          }
        },
        {
          content:'Testsubbox3',
          state:2,
          positioning: {
            sizeX:1,
            sizeY:1,
            row:2,
            col:1
          }
        },
        {
          content:'Testsubbox4',
          state:3,
          positioning: {
            sizeX:1,
            sizeY:1,
            row:2,
            col:2
          }
        }
      ],
      positioning: {
        sizeX:8,
        sizeY:4,
        row:5,
        col:1
      }
    },
    {
      //See the types in config.boxTypes
      type:1,
      //The default html to be displayed in the displayBox
      content:'testbox4',
      //The diffrent slides that will be cycled through with every update
      slides: [
        {
          //Function called on refresh; return will be an array of the html to put into the box(at 0) and the index of the state(at 1)
          update:function () {return ['testslide1<br>' + Date(), 0]},
          //how many seconds this slide is active
          updateFreq:10
        },
        {
          update:function () {return ['testslide2<br>' + Date(), 1]},
          updateFreq:10
        },
        {
          update:function () {return ['testslide3<br>' + Date(), 2]},
          updateFreq:20
        },
        {
          update:function () {return ['testslide4<br>' + Date(), 3]},
          updateFreq:10
        },
      ],
      //The index of the state as in config.states
      state:3,
      //how long to wait until next update in seconds; gets overwritten by the currently active slide
      updateFreq:10,
      positioning: {
        //width of box
        sizeX:8,
        //height of box
        sizeY:4,
        row:5,
        col:9
        }
    }
  ]
}
