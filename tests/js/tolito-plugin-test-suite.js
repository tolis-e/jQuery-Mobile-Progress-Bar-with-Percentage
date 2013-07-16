var TolitoPluginTestSuite = {},
    Utilities,
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
    if (Utilities === undefined) 
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
                return str2.indexOf(str1) != -1;
            }
        }
    }

    TolitoPluginTestSuite.run = function () 
    {
        QUnit.config.reorder = false;

        module("Configuration");

        test("Test Setters & Builder", function () 
        {
            expect(12);
            tolito = TolitoProgressBar(PROGRESS_BAR_ELEMENT_ID)
                .setOuterTheme(OUTER_THEME)
                .setInnerTheme(INNER_THEME)
                .isMini(MINI)
                .setMax(MAX)
                .setStartFrom(START_FROM)
                .setInterval(INTERVAL)
                .showCounter(SHOW_COUNTER)
                .build();
            ok(tolito !== undefined, "Progress bar is defined");
            strictEqual(tolito.getOuterTheme(), OUTER_THEME, "Outer theme setter");
            strictEqual(tolito.getInnerTheme(), INNER_THEME, "Inner theme setter");
            strictEqual(tolito.getMini(), MINI, "Is mini setter");
            strictEqual(tolito.getMax(), MAX, "Max value setter");
            strictEqual(tolito.getStartFrom(), START_FROM, "Start from setter");
            strictEqual(tolito.getInterval(), INTERVAL, "Interval setter");
            strictEqual(tolito.getShowCounter(), SHOW_COUNTER, "Show counter setter");
            var classValue = Utilities.getClass(PROGRESS_BAR_ELEMENT_ID);
            ok(Utilities.stringExistsInString(["ui-tolito-progressbar", MINI ? "-mini" : ""].join(""), classValue),
                "Contains mini or normal class");
            ok(Utilities.stringExistsInString(["ui-tolito-progressbar-outer-", OUTER_THEME].join(""), classValue),
                "Contains correct outer theme");
            var classValueOfFirstChild = Utilities.getClass(Utilities.getChild(PROGRESS_BAR_ELEMENT_ID, 0));
            ok(SHOW_COUNTER ? Utilities.stringExistsInString("ui-tolito-progressbar-label", classValueOfFirstChild) :
                true, "Contains label");
            var classValueOfSecondChild = Utilities.getClass(Utilities.getChild(PROGRESS_BAR_ELEMENT_ID, 1));
            ok(Utilities.stringExistsInString(["ui-tolito-progressbar-active-", INNER_THEME].join(""), SHOW_COUNTER ?
                classValueOfSecondChild : classValueOfFirstChild), "Contains correct inner theme");
        });

        module("Functionality");

        test("Test Set Value", function () 
        {
            expect(3);
            strictEqual(Utilities.getValue(PROGRESS_BAR_ELEMENT_ID), START_FROM, ["Initial value is ", START_FROM].join(""));
            tolito.setValue(10);
            strictEqual(Utilities.getValue(PROGRESS_BAR_ELEMENT_ID), 10, "Value is 10");
            tolito.setValue(START_FROM);
            strictEqual(Utilities.getValue(PROGRESS_BAR_ELEMENT_ID), START_FROM, ["Value is ", START_FROM].join(""));
        });

        test("Test Run", function () 
        {
            expect(3);
            var beforeVal = Utilities.getValue(PROGRESS_BAR_ELEMENT_ID);
            tolito.run();
            stop();
            setTimeout(function () 
            {
                tolito.stop();
                var afterVal = Utilities.getValue(PROGRESS_BAR_ELEMENT_ID);
                ok(afterVal > beforeVal, "Value after run is greater");
                stop();
                setTimeout(function () 
                {
                    strictEqual(Utilities.getValue(PROGRESS_BAR_ELEMENT_ID), afterVal, "Value is not changed after stop");
                    tolito.run();
                    stop();
                    setTimeout(function () 
                    {
                        ok(Utilities.getValue(PROGRESS_BAR_ELEMENT_ID) > afterVal, "Run after stop works");
                        tolito.stop();
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
            tolito.run();
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
            tolito.destroy();
            tolito = TolitoProgressBar(PROGRESS_BAR_ELEMENT_ID)
                .setOuterTheme(OUTER_THEME)
                .isMini(MINI)
                .isIndefinite(true)
                .build();
            var classValue = Utilities.getClass(Utilities.getChild(PROGRESS_BAR_ELEMENT_ID, 0));
            ok(Utilities.stringExistsInString("ui-tolito-progressbar-active-indefinite", classValue), "Indefinite class exists");
            tolito.destroy();
        });
    }
}());

$(document).on('pageinit', '#test-page', function () {
    TolitoPluginTestSuite.run();
});
