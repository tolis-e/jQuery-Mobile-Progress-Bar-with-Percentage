# jQuery-Mobile-Progress-Bar-with-Percentage v1.0.4 (Tolito Progress Bar)

The Tolito Progress Bar is a plugin for jQuery Mobile which creates, manages, starts, stops, resumes and explicitly sets the value of a progress bar or creates an indefinite loading bar. In addition it provides the options to set the progress bar's outer theme and inner filling theme on the basis of the jQuery Mobile standard themes, to show a percentage completion counter, to set whether the progress bar has normal or mini size, to define the interval which specifies the filling frequency rate, to configure the max value of the outer bar and set the initial value of the filling inner bar. The 
JavaScript prototype chaining method has been used in order to enable the chaining of separate method calls where each call is made on the same instance. 

[![Build Status](https://travis-ci.org/tolis-e/jQuery-Mobile-Progress-Bar-with-Percentage.png?branch=master)](https://travis-ci.org/tolis-e/jQuery-Mobile-Progress-Bar-with-Percentage)

## Compatibility

   Tested along with:
   
   * jQuery 1.8.2 and jQuery Mobile 1.2.0
   * jQuery 1.8.2 and jQuery Mobile 1.3.0
   * jQuery 1.9.1 and jQuery Mobile 1.3.1

## Examples Folder

   The examples folder contains 9 sample HTML files.
    
   * example_1.html: mini tolito progress bar with percentage counter
   * example_2.html: jQuery Mobile dialog with embedded tolito progress bar
   * example_3.html: overlay with centered tolito progress bar
   * example_4.html: jQuery Mobile dialog with a tolito progress bar which starts after a delay period
   * example_5.html: basic default mini tolito progress bar
   * example_6.html: tolito progress bar which stops after 5 seconds
   * example_7.html: tolito progress bar which stops after 5 seconds and resumes after 3 seconds
   * example_8.html: shows how to set explicitly the tolito progress bar's status
   * example_9.html: shows how to listen the event which notifies that the progress bar is completed
   * example_10.html: shows how to create an indefinite progress bar

## Quick Start Guide

    Step 1
    -------

    Include the following CSS and JS files inside the head section of your HTML file. Please note 
    that you can use local copies of the jQuery and jQuery Mobile CSS and JS files instead of the
    CDN hosted ones. The X.X.X represents the digits which define a specific version (ex: 1.8.2).

    <!-- /jQuery Mobile X.X.X CSS file -->
    <link rel="stylesheet" href="http://code.jquery.com/mobile/X.X.X/jquery.mobile-X.X.X.min.css" />
    <!-- /Tolito CSS file -->
    <link rel="stylesheet" type="text/css" href="./css/tolito-X.X.X.min.css" />
    <!-- /jQuery X.X.X JS CDN hosted file -->
    <script src="http://code.jquery.com/jquery-X.X.X.min.js"></script>
    <!-- /jQuery Mobile X.X.X JS CDN hosted file -->
    <script src="http://code.jquery.com/mobile/X.X.X/jquery.mobile-X.X.X.min.js"></script>
    <!-- /Tolito JS file -->
    <script type="text/javascript" src="./js/tolito-X.X.X.min.js"></script>

    Step 2
    -------
    Add the following HTML snippet inside your jQM page:

    <!-- /Tolito Progress Bar v1.0 for jQuery Mobile -->
    <div id="progressbar"></div>
    
    Step 3
    -------
    Use the following snippet to configure, build and init the progress bar. It is not mandatory 
    to set the options. The TolitoProgressBar constructor expects to receive as an argument 
    the element id of the div tag created in Step 2. Check the examples for usage instructions.
   
    TolitoProgressBar('progressbar')
        .setOuterTheme('b')
        .setInnerTheme('e')
        .isMini(false)
        .setMax(100)
        .setStartFrom(0)
        .setInterval(10)
        .showCounter(true)
        .logOptions()
        .build()
        .run();

    Listen the complete event:

        When the progress bar is completed, a complete event is triggered. The below piece of code 
        attaches an event handler:

            $(document)
                .on('complete', '#progressbar', function () {
                    // your code
            });

    Configuration Setters, Build and Init procedure:
    
        setOuterTheme(theme)
            Usage: Optional
            Description: Sets the outer theme of the progress bar. The theme argument
            must be 'a' or 'b' or 'c' or 'd' or 'e'. The default theme is based
            on the inherit chain or the default value 'c'.

        setInnerTheme(theme)
            Usage: Optional
            Description: Sets the filling theme of the progress bar. The theme argument
            must be 'a' or 'b' or 'c' or 'd' or 'e'. The default theme is based
            on the inherit chain or the default value 'c'.

        isMini(bool)
            Usage: Optional
            Description: Sets whether the progress bar has mini size. The bool argument
            must be true or false. The default value is false.

        setMax(max)
            Usage: Optional
            Description: Sets the max value of the progress bar. The progress bar is
            considered as completed when the counter reaches the specified
            max value. The default value is 100.

        setStartFrom(startFrom)
            Usage: Optional
            Decsription: Sets the initial value of the filling bar. For example if a progress
            bar has max value 100 and the startFrom value is 50 then the bar
            will start loading from value 50 (the middle of the bar). The default
            value is 0.

        setInterval(interval)
            Usage: Optional
            Description: Sets the progress bar's loading frequency rate in milliseconds. The 
            default value is 100.

        showCounter(bool)
            Usage: Optional
            Description: Sets whether a percentage completion counter is appeared or not. The
            bool argument must be true or false. The default value is true.
            
        isIndefinite(bool)
            Usage: Optional
            Description: Sets whether the progress bar is indefinite. The bool value must be
            true or false. The default value is false.

        logOptions()
            Usage: Optional
            Description: Logs the configured options in the console.

        build()
            Usage: Mandatory
            Description: Creates the progress bar instance.

        run()
            Usage: Optional
            Description: Inits or resumes the loading/filling procedure.

        stop()
            Usage: Optional
            Description: Stops the loading/filling procedure.

        setValue(val)
            Usage: Optional
            Description: Explicitly sets the value of the progress bar.

## License

Apache License Version 2.0 / Check the LICENSE.txt file for more details.

## GitHub repository

https://github.com/tolis-e/jQuery-Mobile-Progress-Bar-with-Percentage
