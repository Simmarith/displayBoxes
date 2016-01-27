function CustomBox(boxNr, boxConf, parentGrid) {
    //Methods
    this.init = function () {
        this.jQueryElement = this.parentGrid.add_widget('<div class="displayBox ' + this.state + '" boxNr="' + this.boxNr + '">' + this.config.content + '</div>', this.positioning.sizeX, this.positioning.sizeY, this.positioning.col, this.positioning.row);
    }
    this.update = function () {
        var thisObj = this;
        var updatedInfo = this.config.update();
        this.content = updatedInfo[0];
        this.state = config.states[updatedInfo[1]];
        this.jQueryElement.html(this.content);
        config.states.map(function (state) {
            thisObj.jQueryElement.removeClass(state);
        });
        this.jQueryElement.addClass(this.state);
        console.log('Box ' + boxNr + '(custom) Has been updated!');
    }
    //Constructor
    DisplayBox.call(this, boxNr, boxConf, parentGrid);
    this.content = this.config.content;
    this.type = 'custom';
}