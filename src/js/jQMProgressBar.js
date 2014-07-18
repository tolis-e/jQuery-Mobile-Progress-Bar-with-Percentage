/*
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
(function ($, undefined) {
    $.widget("mobile.progressbar", {
        options: {
            outerTheme: null,
            innerTheme: null,
            mini: false,
            value: 0,
            max: 100,
            counter: true,
            indefinite: false
        },
        min: 0,
        _create: function () {
            var control = this.element,
                parentTheme = $.mobile.getInheritedTheme(control, "c"),
                outerTheme = this.options.outerTheme || parentTheme,
                innerTheme = this.options.indefinite ? "indefinite" : this.options.innerTheme || parentTheme,
                miniClass = this.options.mini ? " ui-jqm-progressbar-mini" : "",
                counter = this.options.counter;
            this.element.addClass(['ui-jqm-progressbar ', " ui-jqm-progressbar-outer-", outerTheme,
                ' ui-jqm-progressbar-corner-all', miniClass
            ].join(""))
                .attr({
                    role: "progressbar",
                    "min-value": this.min,
                    "max-value": this.options.max,
                    "content-value": this._value()
                });
            if (counter && !this.options.indefinite) {
                this.labelContent = ($("<div></div>")
                    .text(this._value())
                    .addClass('ui-jqm-progressbar-label ui-jqm-progressbar-corner-all'))
                    .appendTo(this.element);
            }
            this.valueContent = ($("<div></div>")
                .addClass(['ui-jqm-progressbar-bg ', " ui-jqm-progressbar-active-", innerTheme,
                    ' ui-jqm-progressbar-corner-all'
                ].join("")))
                .appendTo(this.element);
            if (!this.options.indefinite) {
                this._refreshValue();
                this.oldValue = this._value();
            }
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
                if (this._value() === this.options.max) {
                    this.element.trigger("complete");
                }
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
                this.labelContent.text([this._percentage(), '%'].join(""));
            }
            this.element.attr("content-value", value);
        }
    });

    /**
        The jQuery Mobile Progress Bar with Percentage.
        @constructs
        @param {String} elementId - the id of the div element which will be shown as progress bar
        @example
        // create a progress bar
        var pbar = jQMProgressBar('progressbar')
            .setOuterTheme('b')
            .setInnerTheme('e')
            .isMini(true)
            .setMax(100)
            .setStartFrom(0)
            .setInterval(50)
            .showCounter(true)
            .build();
    */
    jQMProgressBar = function (elementId) {
        if (elementId === undefined) {
            throw '[Error]: id is undefined';
        }
        if (!(this instanceof jQMProgressBar)) {
            return new jQMProgressBar(elementId);
        }
        this.id = elementId;
        this.outerTheme = null;
        this.innerTheme = null;
        this.max = 100;
        this.startFrom = 0;
        this.interval = 100;
        this.isBuilt = false;
        this.mini = false;
        this.isRunning = false;
        this.indefinite = false;
        return this;
    };

    /**
        Set the outer theme.
        @param {String} newTheme - the outer theme which must be 'a' or 'b' or 'c' or 'd' or 'e'
        @default based on inherit chain or 'c'
        @example
        // create a progress bar
        var pbar = jQMProgressBar('progressbar')
            .setOuterTheme('b')
            .setInnerTheme('e')
            .isMini(false)
            .setMax(100)
            .setStartFrom(0)
            .setInterval(10)
            .showCounter(true)
            .build();
     */
    jQMProgressBar.prototype.setOuterTheme = function (newTheme) {
        if (this.isBuilt) {
            throw '[Error]: pbar is already built.';
        } else {
            this.outerTheme = newTheme;
            return this;
        }
    };

    /**
        Set the inner theme.
        @param {String} newInnerTheme - the outer theme which must be 'a' or 'b' or 'c' or 'd' or 'e'
        @default based on inherit chain or 'c'
        @example
        // create a progress bar
        var pbar = jQMProgressBar('progressbar')
            .setOuterTheme('b')
            .setInnerTheme('e')
            .isMini(false)
            .setMax(100)
            .setStartFrom(0)
            .setInterval(10)
            .showCounter(true)
            .build();
     */
    jQMProgressBar.prototype.setInnerTheme = function (newInnerTheme) {
        if (this.isBuilt) {
            throw '[Error]: pbar is already built.';
        } else {
            this.innerTheme = newInnerTheme;
            return this;
        }
    };

    /**
        Set the initial value of the filling bar.
        @param {Number} newStartFrom - the initial value of the filling bar
        @default 0
        @example
        // create a progress bar
        var pbar = jQMProgressBar('progressbar')
            .setOuterTheme('b')
            .setInnerTheme('e')
            .isMini(false)
            .setMax(100)
            .setStartFrom(0)
            .setInterval(10)
            .showCounter(true)
            .build();
     */
    jQMProgressBar.prototype.setStartFrom = function (newStartFrom) {
        if (this.isBuilt) {
            throw '[Error]: pbar is already built.';
        } else {
            this.startFrom = newStartFrom;
            return this;
        }
    };

    /**
        Set the max value of the filling bar.
        @param {Number} newMax - the max value of the filling bar
        @default 100
        @example
        // create a progress bar
        var pbar = jQMProgressBar('progressbar')
            .setOuterTheme('b')
            .setInnerTheme('e')
            .isMini(false)
            .setMax(100)
            .setStartFrom(0)
            .setInterval(10)
            .showCounter(true)
            .build();
     */
    jQMProgressBar.prototype.setMax = function (newMax) {
        if (this.isBuilt) {
            throw '[Error]: pbar is already built.';
        } else {
            this.max = newMax;
            return this;
        }
    };

    /**
        Set whether the progress bar has mini size.
        @param {Boolean} newMini - true or false
        @default false
        @example
        // create a progress bar
        var pbar = jQMProgressBar('progressbar')
            .setOuterTheme('b')
            .setInnerTheme('e')
            .isMini(false)
            .setMax(100)
            .setStartFrom(0)
            .setInterval(10)
            .showCounter(true)
            .build();
     */
    jQMProgressBar.prototype.isMini = function (newMini) {
        if (this.isBuilt) {
            throw '[Error]: pbar is already built.';
        } else {
            this.mini = newMini;
            return this;
        }
    };

    /**
        Set whether the progress bar is indefinite.
        @param {Boolean} newIndefinite - true or false
        @default false
        @example
        // create a progress bar
        var pbar = jQMProgressBar('progressbar')
            .isIndefinite(true)
            .build();
     */
    jQMProgressBar.prototype.isIndefinite = function (newIndefinite) {
        if (this.isBuilt) {
            throw '[Error]: pbar is already built.';
        } else {
            this.indefinite = newIndefinite;
            return this;
        }
    };

    /**
        Set whether a percentage completion counter appears.
        @param {Boolean} newShowCounter - true or false
        @default true
        @example
        // create a progress bar
        var pbar = jQMProgressBar('progressbar')
            .setOuterTheme('b')
            .setInnerTheme('e')
            .isMini(false)
            .setMax(100)
            .setStartFrom(0)
            .setInterval(10)
            .showCounter(false)
            .build();
     */
    jQMProgressBar.prototype.showCounter = function (newShowCounter) {
        if (this.isBuilt) {
            throw '[Error]: pbar is already built.';
        } else {
            this.showCounter = newShowCounter;
            return this;
        }
    };

    /**
        Set the loading frequency in milliseconds.
        @param {Number} newInterval - the loading frequency in milliseconds
        @default 100
        @example
        // create a progress bar
        var pbar = jQMProgressBar('progressbar')
            .setOuterTheme('b')
            .setInnerTheme('e')
            .isMini(false)
            .setMax(100)
            .setStartFrom(0)
            .setInterval(10)
            .showCounter(true)
            .build();
     */
    jQMProgressBar.prototype.setInterval = function (newInterval) {
        if (this.isBuilt) {
            throw '[Error]: pbar is already built.';
        } else {
            this.interval = newInterval;
            return this;
        }
    };

    /**
        Build the progress bar.
        @example
        // create a progress bar
        var pbar = jQMProgressBar('progressbar')
            .setOuterTheme('b')
            .setInnerTheme('e')
            .isMini(false)
            .setMax(100)
            .setStartFrom(0)
            .setInterval(10)
            .showCounter(true)
            .build();
     */
    jQMProgressBar.prototype.build = function () {
        if (this.isBuilt) {
            throw '[Error]: pbar is already built.';
        } else {
            $(['#', this.id].join(""))
                .progressbar({
                    outerTheme: this.outerTheme,
                    innerTheme: this.innerTheme,
                    value: this.startFrom,
                    max: this.max,
                    mini: this.mini,
                    indefinite: this.indefinite,
                    counter: this.showCounter
                });
            this.isBuilt = true;
            return this;
        }
    };

    /**
        Starts or resumes the loading/filling procedure.
        @example
        // create a progress bar
        var pbar = jQMProgressBar('progressbar')
            .setOuterTheme('b')
            .setInnerTheme('e')
            .isMini(false)
            .setMax(100)
            .setStartFrom(0)
            .setInterval(10)
            .showCounter(true)
            .build();

        pbar.run();
     */
    jQMProgressBar.prototype.run = function () {
        if (this.isRunning) {
            throw '[Error]: pbar is already running.';
        } else if (this.indefinite) {
            throw '[Error]: pbar is indefinite.';
        } else {
            (function loop(instance) {
                instance.fillProgressBar = setTimeout((function (inst) {
                    return function () {
                        var thisValue = $(['#', inst.id].join(""))
                            .progressbar('option', 'value'),
                            counter = !isNaN(thisValue) ? (thisValue + 1) : 1;
                        if (counter > inst.max) {
                            clearTimeout(inst.fillProgressBar);
                        } else {
                            $(['#', inst.id].join(""))
                                .progressbar({
                                    value: counter
                                });
                            loop.call(this, inst);
                        }
                    };
                })(instance), instance.interval);
            })(this);
            this.isRunning = true;
            return this;
        }
    };

    /**
        Stop the loading/filling procedure.
        @example
        // create a progress bar
        var pbar = jQMProgressBar('progressbar')
            .setOuterTheme('b')
            .setInnerTheme('e')
            .isMini(false)
            .setMax(100)
            .setStartFrom(0)
            .setInterval(10)
            .showCounter(true)
            .build()
            .run();

        pbar.stop();
     */
    jQMProgressBar.prototype.stop = function () {
        if (!this.isRunning) {
            throw '[Error]: pbar is already stopped.';
        } else {
            clearTimeout(this.fillProgressBar);
            this.isRunning = false;
            return this;
        }
    };

    /**
        Explicitly set the current loading/filling value.
        @param {Number} val - the current loading/filling value
        @example
        // create a progress bar
        var pbar = jQMProgressBar('progressbar')
            .setOuterTheme('b')
            .setInnerTheme('e')
            .isMini(false)
            .setMax(100)
            .setStartFrom(0)
            .setInterval(10)
            .showCounter(true)
            .build();

        pbar.setValue(50);
     */
    jQMProgressBar.prototype.setValue = function (val) {
        if (this.indefinite) {
            throw '[Error]: pbar is indefinite.';
        } else {
            $(['#', this.id].join(""))
                .progressbar({
                    value: val
                });
            return this;
        }
    };

    /**
        Destroys the progress bar. Removes possible event handler attached to the document element.
        @example
        // create a progress bar
        var pbar = jQMProgressBar('progressbar')
            .setOuterTheme('b')
            .setInnerTheme('e')
            .isMini(false)
            .setMax(100)
            .setStartFrom(0)
            .setInterval(10)
            .showCounter(true)
            .build();

        pbar.destroy();
     */
    jQMProgressBar.prototype.destroy = function () {
        if (!this.isBuilt) {
            throw '[Error]: pbar is not built yet.';
        } else {
            if (this.fillProgressBar) {
                clearTimeout(this.fillProgressBar);
            }
            $(document)
                .off('complete', ['#', this.id].join(""));
            $(['#', this.id].join(""))
                .progressbar('destroy');
            return null;
        }
    };
})(jQuery);
