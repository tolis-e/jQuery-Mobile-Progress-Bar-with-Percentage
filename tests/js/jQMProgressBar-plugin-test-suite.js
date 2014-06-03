var jQMProgressBarPluginTestSuite = {},
    Utilities,
    pbar,
    PROGRESS_BAR_ELEMENT_ID = 'progressbar',
    OUTER_THEME = 'b',
    INNER_THEME = 'e',
    MINI = true,
    MAX = 100,
    START_FROM = 0,
    INTERVAL = 50,
    SHOW_COUNTER = true;

(function ()
{
    if (QUnit && QUnit.config)
    {
        // TODO: Setup test suite so that order does not matter and no tests rely on previous tests
        QUnit.config.reorder = false;
    }

    if (!Utilities)
    {
        Utilities =
        {
            getValue: function (id)
            {
                return $(['#', id].join("")).progressbar('option', 'value');
            },
            getClass: function (idOrEl)
            {
                return (typeof idOrEl === 'string' ? $(['#', idOrEl].join("")) : idOrEl).attr("class");
            },
            getChild: function (id, seq)
            {
                return $(['#', id].join("")).children().eq(seq);
            },
            stringExistsInString: function (str1, str2)
            {
                return str2.indexOf(str1) !== -1;
            }
        };
    }

    jQMProgressBarPluginTestSuite.run = function ()
    {
        module("Configuration");

        test("Test Setters & Builder", function ()
        {
            expect(12);
            pbar = jQMProgressBar(PROGRESS_BAR_ELEMENT_ID)
                .setOuterTheme(OUTER_THEME)
                .setInnerTheme(INNER_THEME)
                .isMini(MINI)
                .setMax(MAX)
                .setStartFrom(START_FROM)
                .setInterval(INTERVAL)
                .showCounter(SHOW_COUNTER)
                .build();
            ok(pbar !== undefined, "Progress bar is defined");
            strictEqual(pbar._outerTheme, OUTER_THEME, "Outer theme setter");
            strictEqual(pbar._innerTheme, INNER_THEME, "Inner theme setter");
            strictEqual(pbar._mini, MINI, "Is mini setter");
            strictEqual(pbar._max, MAX, "Max value setter");
            strictEqual(pbar._startFrom, START_FROM, "Start from setter");
            strictEqual(pbar._interval, INTERVAL, "Interval setter");
            strictEqual(pbar._showCounter, SHOW_COUNTER, "Show counter setter");
            var classValue = Utilities.getClass(PROGRESS_BAR_ELEMENT_ID);
            ok(Utilities.stringExistsInString(["ui-jqm-progressbar", MINI ? "-mini" : ""].join(""), classValue),
                "Contains mini or normal class");
            ok(Utilities.stringExistsInString(["ui-jqm-progressbar-outer-", OUTER_THEME].join(""), classValue),
                "Contains correct outer theme");
            var classValueOfFirstChild = Utilities.getClass(Utilities.getChild(PROGRESS_BAR_ELEMENT_ID, 0));
            ok(SHOW_COUNTER ? Utilities.stringExistsInString("ui-jqm-progressbar-label", classValueOfFirstChild) :
                true, "Contains label");
            var classValueOfSecondChild = Utilities.getClass(Utilities.getChild(PROGRESS_BAR_ELEMENT_ID, 1));
            ok(Utilities.stringExistsInString(["ui-jqm-progressbar-active-", INNER_THEME].join(""), SHOW_COUNTER ?
                classValueOfSecondChild : classValueOfFirstChild), "Contains correct inner theme");
        });

        module("Functionality");

        test("Test Set Value", function ()
        {
            expect(3);
            strictEqual(Utilities.getValue(PROGRESS_BAR_ELEMENT_ID), START_FROM, ["Initial value is ", START_FROM].join(""));
            pbar.setValue(10);
            strictEqual(Utilities.getValue(PROGRESS_BAR_ELEMENT_ID), 10, "Value is 10");
            pbar.setValue(START_FROM);
            strictEqual(Utilities.getValue(PROGRESS_BAR_ELEMENT_ID), START_FROM, ["Value is ", START_FROM].join(""));
        });

        test("Test Run", function ()
        {
            expect(3);
            var beforeVal = Utilities.getValue(PROGRESS_BAR_ELEMENT_ID);
            pbar.run();
            stop();
            setTimeout(function ()
            {
                pbar.stop();
                var afterVal = Utilities.getValue(PROGRESS_BAR_ELEMENT_ID);
                ok(afterVal > beforeVal, "Value after run is greater");
                stop();
                setTimeout(function ()
                {
                    strictEqual(Utilities.getValue(PROGRESS_BAR_ELEMENT_ID), afterVal, "Value is not changed after stop");
                    pbar.run();
                    stop();
                    setTimeout(function ()
                    {
                        ok(Utilities.getValue(PROGRESS_BAR_ELEMENT_ID) > afterVal, "Run after stop works");
                        pbar.stop();
                        start();
                    }, 50);
                    start();
                }, 50);
                start();
            }, 100);
        });

        test("Test Event Fire", function ()
        {
            expect(1);
            pbar.run();
            stop();
            $(document)
                .on('complete', ['#', PROGRESS_BAR_ELEMENT_ID].join(""), function ()
            {
                strictEqual(Utilities.getValue(PROGRESS_BAR_ELEMENT_ID), MAX, "Value is max when bar is completed");
                start();
            });
        });

        test("Test Indefinite", function ()
        {
            expect(1);
            pbar.destroy();
            pbar = jQMProgressBar(PROGRESS_BAR_ELEMENT_ID)
                .setOuterTheme(OUTER_THEME)
                .isMini(MINI)
                .isIndefinite(true)
                .build();
            var classValue = Utilities.getClass(Utilities.getChild(PROGRESS_BAR_ELEMENT_ID, 0));
            ok(Utilities.stringExistsInString("ui-jqm-progressbar-active-indefinite", classValue), "Indefinite class exists");
            pbar.destroy();
        });
    };
}());

$(document).on('pageinit', '#test-page', function () {
    jQMProgressBarPluginTestSuite.run();
});
