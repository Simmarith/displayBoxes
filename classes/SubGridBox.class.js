function SubGridBox(boxNr, boxConf, parentGrid) {
    //Constructor
    DisplayBox.call(this, boxNr, boxConf, parentGrid);
    this.namespace = '#subgrid' + this.boxNr;
    this.rows = this.config.rows;
    this.cols = this.config.cols;
    this.subboxes = this.config.subboxes;
    this.gridsterObj = this.jQueryElement.gridster({
        namespace:this.namespace,
        widget_selector:'.subbox',
        min_cols:this.cols,
        max_cols:this.cols,
        min_rows:this.rows,
        avoid_overlapped_widgets: false,
        widget_base_dimensions:[((this.parentGrid.min_widget_width * this.positioning.sizeX) / this.cols) - 45, ((this.parentGrid.min_widget_height * this.positioning.sizeY) / this.rows) - 45],
        widget_margins:[15,15]
    }).data('gridster');
    //Methods
    this.update = function () {
        this.config.update(this);
        this.subboxes.map(function (subboxObj) {
            if (subboxObj.hasOwnProperty('jQueryElement')) {
                subboxObj.jQueryElement.html(subboxObj.content);
                config.states.map(function (state) {
                    subboxObj.jQueryElement.removeClass(state);
                }, this);
                subboxObj.jQueryElement.addClass(config.states[subboxObj.state]);
                for (var propName in subboxObj.positioning) {
                    subboxObj.jQueryElement.attr('data-' + propName, subboxObj.positioning[propName]);
                }
            }
        }, this);
    }
    this.initBox = function (subboxNr) {
        var subboxObj = this.subboxes[subboxNr];
        if (!(subboxObj.hasOwnProperty('jQueryElement'))) {
            this.gridsterObj.add_widget('<div class="subbox ' + config.states[subboxObj.state] + '" subboxNr="' + subboxNr + '">' + subboxObj.content + '</div>', subboxObj.positioning.sizeX, subboxObj.positioning.sizeY, subboxObj.positioning.col, subboxObj.positioning.row);
            subboxObj.jQueryElement = $('.subbox[subboxNr="' + subboxNr + '"]');
        }
    }
    this.addBox = function (subboxConf) {
        var subboxNr = this.subboxes.length;
        this.subboxes.push(subboxConf);
        this.initBox(subboxNr);
    }
    this.moveBox = function (subboxNr) {
        var subboxObj = this.subboxes[subboxNr];
        if (subboxObj.hasOwnProperty('jQueryElement')) {
            for (var propName in subboxObj.positioning) {
                subboxObj.jQueryElement.attr('data-' + propName, subboxObj.positioning[propName]);
            }
        }
    }
    this.removeBox = function (subboxNr) {
        if (this.subboxes[subboxNr].hasOwnProperty('jQueryElement')) {
            this.gridsterObj.remove_widget(this.subboxes[subboxNr].jQueryElement);
        }
        delete this.subboxes[subboxNr];
    }
    for (var i = this.subboxes.length - 1; i >= 0; i--) {
        this.initBox(i);
    }
}

SubGridBox.prototype.init = function () {
    this.jQueryElement =  this.parentGrid.add_widget('<div id="subgrid' + this.boxNr + '" class="displayBox ' + this.state + '" boxNr="' + this.boxNr + '"></div>', this.positioning.sizeX, this.positioning.sizeY, this.positioning.col, this.positioning.row);
};