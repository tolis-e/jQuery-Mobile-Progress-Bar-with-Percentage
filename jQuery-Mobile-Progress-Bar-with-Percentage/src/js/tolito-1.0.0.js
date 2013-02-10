$.widget("mobile.progressbar", {
    options: {
        outerTheme: null,
        innerTheme: null,
        mini: false,
        value: 0,
        max: 100,
        counter: true
    },
    min: 0,
    _create: function () {
        var control = this.element,
            parentTheme = $.mobile.getInheritedTheme(control, "c"),
            outerTheme = this.options.outerTheme || parentTheme,
            innerTheme = this.options.innerTheme || parentTheme,
            miniClass = this.options.mini ? " ui-tolito-progressbar-mini" : "",
            counter = this.options.counter;
        this.element.addClass(['ui-tolito-progressbar ', " ui-tolito-progressbar-outer-", outerTheme, ' ui-tolito-progressbar-corner-all', miniClass].join(""))
            .attr({
            role: "progressbar",
            "min-value": this.min,
            "max-value": this.options.max,
            "content-value": this._value()
        });
        if (counter) {
            this.labelContent = ($("<div></div>")
                .text(this._value())
                .addClass('ui-tolito-progressbar-label ui-tolito-progressbar-corner-all'))
                .appendTo(this.element);
        }
        this.valueContent = ($("<div></div>")
            .addClass(['ui-tolito-progressbar-bg ', " ui-tolito-progressbar-active-", innerTheme, ' ui-tolito-progressbar-corner-all'].join("")))
            .appendTo(this.element);
        this._refreshValue();
        this.oldValue = this._value();
    },
    _destroy: function () {
        this.element.removeClass()
            .removeAttr("role")
            .removeAttr("min-value")
            .removeAttr("max-value")
            .removeAttr("content-value");
        if ((typeof this.labelContent !== "undefined")) {
            this.labelContent.remove();
        }
        this.valueContent.remove();
    },
    value: function (newValue) {
        if (newValue === undefined) {
            return this._value();
        }
        this._setOption("value", newValue);
        return this;
    },
    _setOption: function (key, value) {
        this.options.value = value;
        if (key === "value") {
            this._refreshValue();
        }
    },
    _value: function () {
        var val = this.options.value;
        if (typeof val !== "number") {
            val = 0;
        }
        return Math.min(this.options.max, Math.max(this.min, val));
    },
    _percentage: function () {
        return 100 * this._value() / this.options.max;
    },
    _refreshValue: function () {
        var value = this.value();
        this.oldValue = value;
        this.valueContent.css("width", [this._percentage(), '%'].join(""));
        if ((typeof this.labelContent !== "undefined")) {
            this.labelContent.text([this._percentage(), '%'].join(""))
        }
        this.element.attr("content-value", value);
    }
});

TolitoConstructor = function (elementId) {
    if (elementId === undefined) {
        throw '[Error]: The tolito progress bar element id is undefined';
    }
    this._id = elementId;
    this._defaultOuterTheme = null;
    this._defaultInnerTheme = null;
    this._defaultMax = 100;
    this._defaultStartFrom = 0;
    this._defaultInterval = 100;
    return this;
}

TolitoProgressBar = function (arg) {
    return new TolitoConstructor(arg);
}

TolitoConstructor.prototype = {
    logOptions: function () {
        ((typeof console === "undefined") ? {
            log: function () {}
        } : console)
            .log(["id: '", this.getId(), "' outerTheme: '", this.getOuterTheme(), "' innerTheme: '", this.getInnerTheme(), "' max: '", this.getMax(), "' mini: '", this.getMini(), "' startFrom: '", this.getStartFrom(), "' interval: '", this.getInterval(), "' showCounter: '", this.getShowCounter(), "'"].join(""));
        return this;
    },
    getId: function () {
        return this._id;
    },
    setOuterTheme: function (newTheme) {
        this._outerTheme = newTheme;
        return this;
    },
    getOuterTheme: function () {
        return this._outerTheme || this._defaultOuterTheme;
    },
    setInnerTheme: function (newInnerTheme) {
        this._innerTheme = newInnerTheme;
        return this;
    },
    getInnerTheme: function () {
        return this._innerTheme || this._defaultInnerTheme;
    },
    setStartFrom: function (newStartFrom) {
        this._startFrom = newStartFrom;
        return this;
    },
    getStartFrom: function () {
        return this._startFrom || this._defaultStartFrom;
    },
    setMax: function (newMax) {
        this._max = newMax;
        return this;
    },
    getMax: function () {
        return this._max || this._defaultMax;
    },
    isMini: function (newMini) {
        this._mini = newMini;
        return this;
    },
    getMini: function () {
        return this._mini;
    },
    showCounter: function (newShowCounter) {
        this._showCounter = newShowCounter;
        return this;
    },
    getShowCounter: function () {
        return this._showCounter;
    },
    setInterval: function (newInterval) {
        this._interval = newInterval;
        return this;
    },
    getInterval: function () {
        return this._interval || this._defaultInterval;
    },
    build: function () {
        $(['#', this.getId()].join(""))
            .progressbar({
            outerTheme: this.getOuterTheme(),
            innerTheme: this.getInnerTheme(),
            value: this.getStartFrom(),
            max: this.getMax(),
            mini: this.getMini(),
            counter: this.getShowCounter()
        });
		return this;
    },
    init: function () {
	fillProgressBar = setInterval((function (inst) {
            return function () {
                var thisValue = $(['#', inst.getId()].join(""))
                    .progressbar('option', 'value'),
                    counter = !isNaN(thisValue) ? (thisValue + 1) : 1;
                if (counter > inst.getMax()) {
                    clearInterval(fillProgressBar);
                } else {
                    $(['#', inst.getId()].join(""))
                        .progressbar({
                        value: counter
                    });
                }
            }
        })(this), this.getInterval());
    }
};
