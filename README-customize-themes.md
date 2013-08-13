## SASS Guide

CSS files included in the current project  are for the default jQuery Mobile themes. If you use a customized theme, you might want to change css colors to match your theme.

[SASS](http://sass-lang.com/ "SASS") is a meta-language on top of CSS, meaning that any valid CSS is also valid SCSS. We could describe SCSS as a scripting language which contains loops, expressions, functions, variables and conditional logic. Its purpose is to help defining the styles of a document in a clean and structured way and avoid writing repetitive CSS.

Here are your steps to generate a CSS file with customized themes:

- modify [tolito.scss](https://github.com/tolis-e/jQuery-Mobile-Progress-Bar-with-Percentage/blob/master/src/scss/tolito.scss) and replace the default colors. For each color there is only one place to replace it, unlike in CSS where one would have to replace in a number of places.
- run sass interpreter (unless you use directory-watching script)
- css file will be automatically generated
- currently [tolito.scss](https://github.com/tolis-e/jQuery-Mobile-Progress-Bar-with-Percentage/blob/master/src/scss/tolito.scss) has values that produce the css file identical to [tolito-1.0.5.css](https://github.com/tolis-e/jQuery-Mobile-Progress-Bar-with-Percentage/blob/master/src/css/tolito-1.0.5.css).

**Since the CSS styles are based on the default jQuery Mobile styles, do not forget to add the jQuery MIT License in the produced CSS file.**
