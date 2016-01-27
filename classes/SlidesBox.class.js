function SlidesBox(boxNr, boxConf, parentGrid) {
    //Methods
    this.init = function () {
        this.jQueryElement = this.parentGrid.add_widget('<div class="displayBox ' + this.state + '" boxNr="' + this.boxNr + '">' + this.config.content + '</div>', this.positioning.sizeX, this.positioning.sizeY, this.positioning.col, this.positioning.row);
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
    DisplayBox.call(this, boxNr, boxConf, parentGrid);
    this.currentSlide = 0;
    this.slides = this.config.slides;
    this.content = this.config.content;
    this.type = 'slides';
}