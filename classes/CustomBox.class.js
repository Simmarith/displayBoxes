function CustomBox(boxNr, boxConf, parentContainer) {
    //Methods
    this.init = function () {
        $(this.parentContainer).append('<div class="displayBox ' + this.state + '" boxNr="' + this.boxNr + '" data-row="' + this.positioning.row + '" data-col="' + this.positioning.col + '" data-sizex="' + this.positioning.sizeX + '" data-sizey="' + this.positioning.sizeY + '">' + this.config.content + '</div>');
        this.jQueryElement = $('.displayBox[boxNr="' + this.boxNr + '"]');
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
    DisplayBox.call(this, boxNr, boxConf, parentContainer);
    this.content = this.config.content;
    this.type = 'custom';
}