# templateking

Nested templates that use CSS selectors to populate dynamic data points. 

This module allows you to develop plain HTML/CSS templates with dummy data in the places dynamic
data will be inserted. The benefit is that the templates can be developed independently from the
program that dynamically inserts data into the web page.

It also provides for layering templates so you can have one template for the entire site that is
used on every page, one template for each section that is used throughout it's own seciton, one 
template for each sub-section used on each page in it's particular sub-seciton, and one template 
for each page. 

So, for an example, the page template can be wrapped in a sub-section template, those together can
be wrapped in a section template, and those can be wrapped in a site template.


The number of nested layers is unlimited.

Once it compiles the templates you've listed, this module applies an object you've provided that 
identifies CSS selectors as key names paired with dynamic data values and replaces the default 
content of the elements in the templates that are identified by the corresponding CSS selectors.

--- 
## simple example

``` js
// require the module and identify the directory that contains the template files
var templates = require('templateking')({directory: 'examples/public'}) 

templates(

    // list the nested templates, starting with outer to inner
    ['simple.html', 'message.html'], 

    // provide an object of CSS selector keys with values to replace the default template text
    {
        'title':     'My New Title', 
        '#message':  'Hello templateking!', 
        '#datetime': Date()
    }, 

    // provide a writeable stream to pipe the resulting HTML text to
    process.stdout 
)
```

Given the templates:

simple.html
```
<!DOCTYPE html>
<html>
  <head>
    <title>templateking</title>
  </head>
  <body>
    <div class="template">template</div>
  </body>
</html>
```

And message.html
```
    <h3 id="message">Message</h3>
    <div>Date/Time: <span id="datetime">datetime</span></div>
```

Will output:
```
<!DOCTYPE html>
<html>
    <head>
        <title>My New Title</title>
    </head>
    <body>
        <div class="template">
            <h3 id="message">Hello templateking!</h3>
            <div>Date/Time: <span id="datetime">Tue Nov 24 2015 12:51:23 GMT-0600 (CST)</span></div>
        </div>
    </body>
</html>
```

See [the examples directory](https://github.com/bloodyKnuckles/templateking/tree/master/examples)
for more examples and additional functionality.

