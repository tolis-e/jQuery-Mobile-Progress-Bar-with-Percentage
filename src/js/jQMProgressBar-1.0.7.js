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

    jQMProgressBar = function (elementId) {
        if (elementId === undefined) {
            throw '[Error]: id is undefined';
        }
        if (!(this instanceof jQMProgressBar)) {
            return new jQMProgressBar(elementId);
        }
        this._id = elementId;
        this._outerTheme = null;
        this._innerTheme = null;
        this._max = 100;
        this._startFrom = 0;
        this._interval = 100;
        this._isBuilt = false;
        this._mini = false;
        this._isRunning = false;
        this._indefinite = false;
        return this;
    };

    jQMProgressBar.prototype.setOuterTheme = function (newTheme) {
        if (this._isBuilt) {
            throw '[Error]: pbar is already built.';
        } else {
            this._outerTheme = newTheme;
            return this;
        }
    };

    jQMProgressBar.prototype.setInnerTheme = function (newInnerTheme) {
        if (this._isBuilt) {
            throw '[Error]: pbar is already built.';
        } else {
            this._innerTheme = newInnerTheme;
            return this;
        }
    };

    jQMProgressBar.prototype.setStartFrom = function (newStartFrom) {
        if (this._isBuilt) {
            throw '[Error]: pbar is already built.';
        } else {
            this._startFrom = newStartFrom;
            return this;
        }
    };

    jQMProgressBar.prototype.setMax = function (newMax) {
        if (this._isBuilt) {
            throw '[Error]: pbar is already built.';
        } else {
            this._max = newMax;
            return this;
        }
    };

    jQMProgressBar.prototype.isMini = function (newMini) {
        if (this._isBuilt) {
            throw '[Error]: pbar is already built.';
        } else {
            this._mini = newMini;
            return this;
        }
    };

    jQMProgressBar.prototype.isIndefinite = function (newIndefinite) {
        if (this._isBuilt) {
            throw '[Error]: pbar is already built.';
        } else {
            this._indefinite = newIndefinite;
            return this;
        }
    };

    jQMProgressBar.prototype.showCounter = function (newShowCounter) {
        if (this._isBuilt) {
            throw '[Error]: pbar is already built.';
        } else {
            this._showCounter = newShowCounter;
            return this;
        }
    };

    jQMProgressBar.prototype.setInterval = function (newInterval) {
        if (this._isBuilt) {
            throw '[Error]: pbar is already built.';
        } else {
            this._interval = newInterval;
            return this;
        }
    };

    jQMProgressBar.prototype.build = function () {
        if (this._isBuilt) {
            throw '[Error]: pbar is already built.';
        } else {
            $(['#', this._id].join(""))
                .progressbar({
                    outerTheme: this._outerTheme,
                    innerTheme: this._innerTheme,
                    value: this._startFrom,
                    max: this._max,
                    mini: this._mini,
                    indefinite: this._indefinite,
                    counter: this.showCounter
                });
            this._isBuilt = true;
            return this;
        }
    };

    jQMProgressBar.prototype.run = function () {
        if (this._isRunning) {
            throw '[Error]: pbar is already running.';
        } else if (this._indefinite) {
            throw '[Error]: pbar is indefinite.';
        } else {
            (function loop(instance) {
                instance.fillProgressBar = setTimeout((function (inst) {
                    return function () {
                        var thisValue = $(['#', inst._id].join(""))
                            .progressbar('option', 'value'),
                            counter = !isNaN(thisValue) ? (thisValue + 1) : 1;
                        if (counter > inst._max) {
                            clearTimeout(inst.fillProgressBar);
                        } else {
                            $(['#', inst._id].join(""))
                                .progressbar({
                                    value: counter
                                });
                            loop.call(this, inst);
                        }
                    };
                })(instance), instance._interval);
            })(this);
            this._isRunning = true;
            return this;
        }
    };

    jQMProgressBar.prototype.stop = function () {
        if (!this._isRunning) {
            throw '[Error]: pbar is already stopped.';
        } else {
            clearTimeout(this.fillProgressBar);
            this._isRunning = false;
            return this;
        }
    };

    jQMProgressBar.prototype.setValue = function (val) {
        if (this._indefinite) {
            throw '[Error]: pbar is indefinite.';
        } else {
            $(['#', this._id].join(""))
                .progressbar({
                    value: val
                });
            return this;
        }
    };

    jQMProgressBar.prototype.destroy = function () {
        if (!this._isBuilt) {
            throw '[Error]: pbar is not built yet.';
        } else {
            if (this.fillProgressBar) {
                clearTimeout(this.fillProgressBar);
            }
            $(document)
                .off('complete', ['#', this._id].join(""));
            $(['#', this._id].join(""))
                .progressbar('destroy');
            return null;
        }
    };
})(jQuery);
