function DisplayBox(boxNr, boxConf, parentContainer) {
    this.boxNr = boxNr;
    this.config = boxConf;
    if (this.config.hasOwnProperty('updateFreq')) {
        this.updateFreq = this.config.updateFreq;
    } else {
        this.updateFreq = config.defaults.updateFreq;
    }
    this.state = config.states[this.config.state];
    this.positioning = this.config.positioning;
    this.parentContainer = parentContainer;
    this.jQueryElement;
    this.init();
}

DisplayBox.prototype.init = function () {
    $(this.parentContainer).append('<div class="displayBox ' + this.state + '" boxNr="' + this.boxNr + '" data-row="' + this.positioning.row + '" data-col="' + this.positioning.col + '" data-sizex="' + this.positioning.sizeX + '" data-sizey="' + this.positioning.sizeY + '"></div>');
    this.jQueryElement = $('.displayBox[boxNr="' + this.boxNr + '"]');
};

DisplayBox.prototype.update = function () {
    var thisObj = this;
    config.states.map(function (state) {
        thisObj.jQueryElement.removeClass(state);
    });
    this.jQueryElement.addClass(this.state);
}