jQuery-Mobile-Progress-Bar-with-Percentage v1.0.0 (called Tolito Progress Bar)
=========================================================

jQuery-Mobile-Progress-Bar-with-Percentage v1.0.0 Overview
--------

The Tolito Progress Bar is a custom plugin for jQuery Mobile which offers the functionality to create and manage a 
progress bar. In addition it provides the options to set the progress bar's outer theme and inner filling theme on the 
basis of the jQuery Mobile standard themes, to show a percentage completion counter, to set whether the progress bar 
has normal or mini size, to define the interval which specifies the filling frequency rate, to configure the max value 
of the outer bar and set the initial value of the filling inner bar. The idea of JavaScript prototype chaining has been 
used in order to enable the chaining of separate method calls where each call is made on the same instance. 

Compatibility
--------

    Tested along jQuery 1.8.2 and jQuery Mobile 1.2.0

Examples
-------
	
	The are 5 example files in the examples folder. The example_1.html file contains an example of a mini tolito 
	progress bar. The example_2.html includes an example of a jQuery Mobile dialog which contains a tolito progress 
	bar. The example_3.html includes an example of an overlay which contains a tolito progress bar. 
	The example_4.html includes an example of a jQuery Mobile dialog which contains a tolito progress bar that 
	inits loading after delay. The example_5.html contains an example of a basic unconfigured mini tolito progress 
	bar.Open the example files using a browser. Note that the HTML files use CDN-hosted versions of jQuery Mobile 
	and jQuery.

Quick Start Guide
---------------
	
	Step 1
	-------

	Include the following CSS and JS files inside the head section of your HTML file. Note that
	you can use local copies of the jQuery and jQuery Mobile CSS and JS files instead of the
	CDN hosted ones.
	
	<!-- /jQuery Mobile 1.2.0 CSS file -->
	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css" />
	<!-- /Tolito 1.0 CSS file -->
	<link rel="stylesheet" type="text/css" href="./css/tolito-1.0.0.css" />
	<!-- /jQuery 1.8.2 JS CDN hosted file -->
	<script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
	<!-- /jQuery Mobile 1.2.0 JS CDN hosted file -->
	<script src="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>
	<!-- /Tolito JS file -->
	<script type="text/javascript" src="./js/tolito-1.0.0.js"></script>

	Step 2
	-------
	Add the following HTML snippet inside your jQM page:
	
	<!-- /Tolito Progress Bar v1.0 for jQuery Mobile -->
	<div id="progressbar"></div>
	
	Step 3
	-------
	Use the following snippet to configure and build the progress bar. Note that
	it is not mandatory to set the options. The TolitoProgressBar constructor 
	expects to receive as an argument the element id of the div tag created in Step 2.
	
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
		.init();
	
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
		
		logOptions()
			Usage: Optional
			Description: Logs the configured options in the console.
			
		build()
			Usage: Mandatory
			Description: Creates the progress bar instance.
			
		init()
			Usage: Optional
			Description: Inits the loading/filling procedure.

Copyright And License
---------------------

Copyright (c) 2013 Tolis. Check the LICENSE file for more details.

GitHub repository
-------------------

https://github.com/tolis-e/jQuery-Mobile-Progress-Bar-with-Percentage
