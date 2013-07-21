## Quick Start Guide

Step 0
-------

CSS files (as of version 1.0.5) included in Tolito are for the default jQuery Mobile theme. 
If you use a customized theme, you might want to change css colors to match your theme.

[SASS](http://sass-lang.com/ "SASS")  is a popular CSS generating metalanguage and utility.

Here are your steps to generate css file:

- modify src/css/tolito.scss, replacing colors. For each color there is only one place to replace it, unlike in CSS where one would have to replace in a number of places.
- run sass interpreter (unless you use directory-watching script) 
- css file will be automatically generated
- currently src/css/tolito.scss has values that produce the css file identical to src/css/tolito-1.0.5.css. 

