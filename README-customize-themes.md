## SASS Guide

You might want to change the progress bar css colors to match your theme.

[SASS](http://sass-lang.com/ "SASS") is a meta-language on top of CSS, meaning that any valid CSS is also valid SCSS. We could describe SCSS as a scripting language which contains loops, expressions, functions, variables and conditional logic. Its purpose is to help defining the styles of a document in a clean and structured way and avoid writing repetitive CSS.

Here are your steps to generate a CSS file with customized themes:

- modify [jQMProgressBar.scss](https://github.com/tolis-e/jQuery-Mobile-Progress-Bar-with-Percentage/blob/master/src/scss/jQMProgressBar.scss) and replace the default colors. For each color there is only one place to replace it, unlike in CSS where one would have to replace in a number of places.
- run sass interpreter (unless you use directory-watching script)
- css file will be automatically generated
- currently [jQMProgressBar.scss](https://github.com/tolis-e/jQuery-Mobile-Progress-Bar-with-Percentage/blob/master/src/scss/jQMProgressBar.scss) has values that produce the css file identical to [jQMProgressBar-1.0.7.css](https://github.com/tolis-e/jQuery-Mobile-Progress-Bar-with-Percentage/blob/master/src/css/jQMProgressBar-1.0.7.css).

**Don't forget to add the jQuery MIT License in the produced CSS file.**
