function DisplayBox(boxNr, boxConf, parentGrid) {
    this.boxNr = boxNr;
    this.config = boxConf;
    if (this.config.hasOwnProperty('updateFreq')) {
        this.updateFreq = this.config.updateFreq;
    } else {
        this.updateFreq = config.defaults.updateFreq;
    }
    this.state = config.states[this.config.state];
    this.positioning = this.config.positioning;
    this.parentGrid = parentGrid;
    this.jQueryElement;
    this.init();
}

DisplayBox.prototype.init = function () {
    this.jQueryElement =  this.parentGrid.add_widget('<div class="displayBox ' + this.state + '" boxNr="' + this.boxNr + '"></div>', this.positioning.sizeX, this.positioning.sizeY, this.positioning.col, this.positioning.row);
};

DisplayBox.prototype.update = function () {
    var thisObj = this;
    config.states.map(function (state) {
        thisObj.jQueryElement.removeClass(state);
    });
    this.jQueryElement.addClass(this.state);
}