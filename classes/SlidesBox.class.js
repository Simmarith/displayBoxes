function SlidesBox(boxNr, boxConf, parentContainer) {
    //Methods
    this.init = function () {
        $(this.parentContainer).append('<div class="displayBox ' + this.state + '" boxNr="' + this.boxNr + '" data-row="' + this.positioning.row + '" data-col="' + this.positioning.col + '" data-sizex="' + this.positioning.sizeX + '" data-sizey="' + this.positioning.sizeY + '">' + this.config.content + '</div>');
        this.jQueryElement = $('.displayBox[boxNr="' + this.boxNr + '"]');
    }
    this.update = function () {
        var thisObj = this;
        this.currentSlide = this.currentSlide + 1;
        if (this.currentSlide >= this.slides.length) {
          this.currentSlide = 0;
        }
        if (this.slides[this.currentSlide].hasOwnProperty('updateFreq')) {
            this.updateFreq = this.slides[this.currentSlide].updateFreq;
        } else {
            this.updateFreq = config.defaults.updateFreq;
        }
        var updatedInfo = this.slides[this.currentSlide].update();
        this.content = updatedInfo[0];
        this.state = config.states[updatedInfo[1]];
        this.jQueryElement.html(this.content);
        //update State
        config.states.map(function (state) {
            thisObj.jQueryElement.removeClass(state);
        });
        this.jQueryElement.addClass(this.state);
        console.log('Box ' + this.boxNr + '(slides) Has been updated(slideNr:' + this.currentSlide + ')!');
    }
    //Constructor
    DisplayBox.call(this, boxNr, boxConf, parentContainer);
    this.currentSlide = 0;
    this.slides = this.config.slides;
    this.content = this.config.content;
    this.type = 'slides';
}