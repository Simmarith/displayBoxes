var config = {
  //The name of the stylesheet which modifies the boxes/background. Currently working: neon
  style:'neon',
  //Number of seconds until boxes are checked if update is needed
  updateTick:10,
  //The diffrent types of boxes you can use which will be initialized/maintained diffrently. Currently working: custom
  boxTypes: [
    'custom',
    'sql',
    'iframe'
  ],
  states: [
    'nominal',
    'warning',
    'alert',
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
        //Height of box
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
      type:0,
      content:'testbox3',
      update:function () {return ['testbox3<br>' + Date(), 2]},
      state:2,
      updateFreq:10,
      positioning: {
        sizeX:8,
        sizeY:4,
        row:5,
        col:1
      }
    },
    {
      type:0,
      content:'testbox4',
      update:function () {return ['testbox4<br>' + Date(), 3]},
      state:3,
      updateFreq:20,
      positioning: {
        sizeX:8,
        sizeY:4,
        row:5,
        col:9
        }
    }
  ]
}
