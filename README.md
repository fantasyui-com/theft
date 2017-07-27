# theft (a PostCSS plugin)
Means of transporting CSS rule declarations from one file to another.

```JavaScript

const postcss = require('postcss');
const theft = require('./index.js');

  postcss([
    theft({url:'http://localhost/bootstrap.css', source: ['.btn', '.text-muted'], target:'.my-button' }),
    theft({url:'http://localhost/bootstrap.css', source: ['.text-uppercase'], target:'.my-button' })

    theft({css:`.love-button { background: red ! important; }`, source: ['.love-button'], target:'.my-button' }),

  ])

  .process(`.my-button {}`)

  .then(result => { console.log( result.css ) })
  .catch(err => { console.error( err ) });


```
