# displayBoxes


##Implementation

I highly recommend using the software in a separate folder as is and just customize the config(as explained further down the line) for now. If you want to embed it in your own thing nevertheless(and please let me know, I might be able to steal some code :D), here is some info for you:
- The interpreter hangs on to **every** div classed 'boxSpace' for now.
- The widget_base_dimensions property of the gridster instance is set to fit the whole screen with boxes. You should definitely look into that if you don't want to fill the whole screen.

##The config

You basically just have to modify the /config.js in order to fully customize the displayBoxes. Most properties are explained as comment above it.

##Modifying Boxes

The displayBoxes themselves are currently defined in config.noDBBoxes. Every box is a single element of config.noDBBoxes. You can add/remove boxes by adding/removing entries in that array. The structure of that entry is dependent on the Type of the box. Here are the different types:

###Custom
The custom box is the most simple implementation. You just have to modify the content, update, state and positioning properties and your good to go.

```
{
  //See the types in config.boxTypes
  type:0,
  //The default html to be displayed in the displayBox
  content:'testbox1',
  //Function called on refresh; return will be an array of the html to put into the box(at 0) and the index of the state(at 1)
  update:function () {return ['testbox1<br>' + Date(), 0]},
  //The index of the state in config.states
  state:0,
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
}
```

###Slides
The slides box is (currently) a custom box that changes its update property with every refresh. The updateFreq of the box is determined by the currently active slide. If the updateFreq is not defined, it's set to default.

```
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
```

###Subgrid
A subgrid is just a box with another grid in it. It does not support the full featureset of the main grid(yet) though. The subgrid has **one** update function to govern the subboxes. This function gets passed the Object of the SubGridBox its in. You can change the States, positioning and content in the subboxes array(boxObj.subboxes, looks mostly like the one in the config but with an jQueryElement property). These properties will then get updated after your update function has been executed.

```
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
    }
```

Additionally, the SubGridBox got some functions for managing the boxes inside it:

- initBox( (int) subboxNr ) {}
    - creates an actual Box from an object in the subboxes array into the subgrid.
- addBox( (Obj) subboxConf ) {}
    - adds a new entry in the subbox array with the data provided to the function and calls initBox() for that entry
- moveBox( (int) subboxNr ) {}
    - updates the position of the box with this number from subboxes[subboxNr].positioning
- removeBox( (int) subboxNr ) {}
    - removes the subbox with that number from the subboxes array and the grid