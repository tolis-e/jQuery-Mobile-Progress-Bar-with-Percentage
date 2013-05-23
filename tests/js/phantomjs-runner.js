/**
 * Wait until the test condition is true or a timeout occurs. Useful for waiting
 * on a server response or for a ui change (fadeIn, etc.) to occur.
 *
 * @param testFx javascript condition that evaluates to a boolean,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param onReady what to do when testFx condition is fulfilled,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param timeOutMillis the max amount of time to wait. If not specified, 3 sec is used.
 */
function waitFor(testFx, onReady, timeOutMillis) 
{
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 30001, //< Default Max Timout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function () 
        {
            if ((new Date().getTime() - start < maxtimeOutMillis) && !condition) 
            {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof (testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } 
            else 
            {
                if (!condition) 
                {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } 
                else 
                {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof (onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 100); //< repeat check every 250ms
};

var page = require('webpage').create();

page.onConsoleMessage = function (msg) 
{
    console.log(msg);
};

page.open(phantom.args[0], function (status) 
{
    if (status !== "success") 
    {
        console.log("Failed to access network");
        phantom.exit(1);
    } 
    else 
    {
        waitFor(
            function () 
            {
                return page.evaluate(
                    function () 
                    {
                        var results = document.getElementById('qunit-testresult');
                        return results && results.innerText.match('completed');
                    }
                );
            },//testFx end
            function () 
            {
                var failures = page.evaluate(
                    function () 
                    {
                        var results = document.getElementById('qunit-testresult');
                        console.log(results.innerText);
                        try 
                        {
                            return results.getElementsByClassName('failed')[0].innerHTML;
                        } 
                        catch (e) {
                        }
                        return 15000;
                    }
                );// onReady end
                phantom.exit((parseInt(failures, 10) > 0) ? 1 : 0);
            }
        );//waitFor end
    }
});
