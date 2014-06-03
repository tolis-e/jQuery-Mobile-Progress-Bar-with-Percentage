# jQuery-Mobile-Progress-Bar-with-Percentage [![Build Status](https://travis-ci.org/tolis-e/jQuery-Mobile-Progress-Bar-with-Percentage.png?branch=master)](https://travis-ci.org/tolis-e/jQuery-Mobile-Progress-Bar-with-Percentage)
> The jQuery-Mobile-Progress-Bar-with-Percentage is a plugin for jQuery Mobile which creates, manages, starts, stops, resumes and explicitly sets the value of a progress bar or creates an indefinite loading bar. In addition it provides the options to set the progress bar's outer theme and inner filling theme on the basis of the jQuery Mobile standard themes, to show a percentage completion counter, to set whether the progress bar has normal or mini size, to define the interval which specifies the filling frequency rate, to configure the max value of the outer bar and set the initial value of the filling inner bar. The provided SASS file allows the creation of a custom theme.

## Compatibility
Tested using:
   
* jQuery 1.8.2 and jQuery Mobile 1.2.0
* jQuery 1.8.2 and jQuery Mobile 1.3.0
* jQuery 1.9.1 and jQuery Mobile 1.3.1
* jQuery 1.9.1 and jQuery Mobile 1.3.2
* jQuery 1.9.1 and jQuery Mobile 1.4.0

## Examples Folder
The examples folder contains 11 sample HTML files.
    
* example_1.html: mini progress bar with percentage counter
* example_2.html: jQuery Mobile dialog with embedded progress bar
* example_3.html: overlay with centered progress bar
* example_4.html: jQuery Mobile dialog with a progress bar which starts after a delay period
* example_5.html: basic default mini progress bar
* example_6.html: progress bar which stops after 5 seconds
* example_7.html: progress bar which stops after 5 seconds and resumes after 3 seconds
* example_8.html: shows how to set explicitly the progress bar's status
* example_9.html: shows how to attach a handler for the event which notifies that the progress bar is completed
* example_10.html: shows how to create an indefinite progress bar
* example_11.html: shows how to destroy a created progress bar

## Building

### Grunt
> [Grunt](http://gruntjs.com/) is used as the build tool which requires [Node.js](http://nodejs.org/) version >= 0.8.0. Please refer to [nodejs.org](http://nodejs.org) for details regarding installing Node.js. Please refer to Grunt's [getting started](http://gruntjs.com/getting-started) guide for details regarding installing Grunt.

### Installing Build Dependencies
To install the dependencies of the project, navigate to the project's root folder and run the following command:

    $ npm install

This will install the versions of the dependencies declared in package.json. This is only required to be done once before
building the first time, or if the dependencies in package.json have been updated.

### Building the project

    $ grunt

The produced JavaScript and CSS files will be in the __dist__ directory.

## Quick Start Guide

### Step 1
> Include the following CSS and JS files inside the head section of your HTML file. Please note that you can use local copies of the jQuery and jQuery Mobile CSS and JS files instead of the CDN hosted ones. The X.X.X represents the digits which define a specific version (ex: 1.8.2).

```js
<!-- /jQuery Mobile X.X.X CSS file -->
<link rel="stylesheet" href="http://code.jquery.com/mobile/X.X.X/jquery.mobile-X.X.X.min.css" />
<!-- /Progress Bar CSS file -->
<link rel="stylesheet" type="text/css" href="./dist/css/jQuery-Mobile-Progress-Bar-with-Percentage.min.css" />
<!-- /jQuery X.X.X JS CDN hosted file -->
<script src="http://code.jquery.com/jquery-X.X.X.min.js"></script>
<!-- /jQuery Mobile X.X.X JS CDN hosted file -->
<script src="http://code.jquery.com/mobile/X.X.X/jquery.mobile-X.X.X.min.js"></script>
<!-- /Progress Bar JS file -->
<script type="text/javascript" src="./dist/js/jQuery-Mobile-Progress-Bar-with-Percentage.min.js"></script>
```
    
### Step 2
> Add the following HTML snippet inside your jQM page:

    <!-- /Progress Bar for jQuery Mobile -->
    <div id="progressbar"></div>

### Step 3
> Use the following snippet to configure, build and run the progress bar (progressbar is the id of the div element which is created during the previous step). It is not mandatory to set the options.

```js
jQMProgressBar('progressbar')
    .setOuterTheme('b')
    .setInnerTheme('e')
    .isMini(false)
    .setMax(100)
    .setStartFrom(0)
    .setInterval(10)
    .showCounter(true)
    .build()
    .run();
```

When the progress bar is completed, a complete event is triggered. The below piece of code attaches an event handler to the document element:

```js
$(document)
    .on('complete', '#progressbar', function () {
        // your code
});
```

### Configuration setters, build, init, stop and destroy functions:
    
#### setOuterTheme(theme)
Usage: Optional  
Description: Sets the outer theme of the progress bar. The theme argument must be 'a' or 'b' or 'c' or 'd' or 'e'. The default theme is based on the inherit chain or the default value 'c'.

#### setInnerTheme(theme)
Usage: Optional  
Description: Sets the filling theme of the progress bar. The theme argument must be 'a' or 'b' or 'c' or 'd' or 'e'. The default theme is based on the inherit chain or the default value 'c'.

#### isMini(bool)
Usage: Optional  
Description: Sets whether the progress bar has mini size. The bool argument must be true or false. The default value is false.

#### setMax(max)
Usage: Optional  
Description: Sets the max value of the progress bar. The progress bar is considered as completed when the counter reaches the specified max value. The default value is 100.

#### setStartFrom(startFrom)
Usage: Optional  
Decsription: Sets the initial value of the filling bar. For example if a progress bar has max value 100 and the startFrom value is 50 then the bar will start loading from value 50 (the middle of the bar). The default value is 0.

#### setInterval(interval)
Usage: Optional  
Description: Sets the progress bar's loading frequency rate in milliseconds. The default value is 100.

#### showCounter(bool)
Usage: Optional  
Description: Sets whether a percentage completion counter is appeared or not. The bool argument must be true or false. The default value is true.
            
#### isIndefinite(bool)
Usage: Optional  
Description: Sets whether the progress bar is indefinite. The bool value must be true or false. The default value is false.

#### build()
Usage: Mandatory  
Description: Creates the progress bar instance.

#### run()
Usage: Optional  
Description: Inits or resumes the loading/filling procedure.

#### stop()
Usage: Optional  
Description: Stops the loading/filling procedure.

#### setValue(val)
Usage: Optional  
Description: Explicitly sets the value of the progress bar.

#### destroy()
Usage: Optional  
Description: Destroys the progress bar. The progress bar div is rolled back to its initial state. Removes possible event handler attached to the document element and triggered when the progress bar is finished.

## Themes Customization
The CSS included in the current project contains the default jQuery Mobile themes. If you use a customized theme, you might want to change CSS colors to match your theme. You can find instructions for customizing the default jQuery Mobile themes [here](https://github.com/tolis-e/jQuery-Mobile-Progress-Bar-with-Percentage/blob/master/README-customize-themes.md).

Special thanks to [Michael Kariv](https://github.com/michaelkariv) for creating the [SASS](http://sass-lang.com/) [jQMProgressBar.scss](https://github.com/tolis-e/jQuery-Mobile-Progress-Bar-with-Percentage/blob/master/src/scss/jQMProgressBar.scss) file and the corresponding [README](https://github.com/tolis-e/jQuery-Mobile-Progress-Bar-with-Percentage/blob/master/README-customize-themes.md) guide.

## License

jQuery MIT-License / Check the MIT-LICENSE.txt file for more details.

## GitHub repository

https://github.com/tolis-e/jQuery-Mobile-Progress-Bar-with-Percentage
