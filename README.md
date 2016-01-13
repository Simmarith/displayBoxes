# displayBoxes

SOME IMPORTANT INFO:

This is a very early version of this software! most of the features are not implemented jet.

##Implementation

I highly recommend using the software in a separate folder as is and just customize the config(as explained further down the line) for now. If you want to embed it in your own thing nevertheless(and please let me know, I might be able to steal some code :D), here is some info for you:
- The interpreter hangs on to **every** div classed 'boxSpace' for now.
- The widget_base_dimensions property of the gridster instance is set to fit the whole screen with boxes. You should definitely look into that if you don't want to fill the whole screen.

##The config

You basically just have to modify the /config.js in order to fully customize the displayBoxes. Most properties are explained as comment above it.

##Modifying Boxes

The displayBoxes themselves are currently defined in config.noDBBoxes. Every box is a single element of config.noDBBoxes. You can add/remove boxes by adding/removing entries in that array. The structure of that entry is dependent on the Type of the box. Here are the different types:

###Custom
The custom box is the most simple implementation. You just have to modify the content, update and positioning properties and your good to go.
This is currently the only working type, more will get added soon.

```
{
  //See the types in config.boxTypes
  type:0,
  //The default html to be displayed in the displayBox
  content:'testbox1',
  //Function called on refresh; return will be shown in box
  update:function () {return 'testbox1<br>' + Date()},
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
}
```
