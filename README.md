# theft (a PostCSS plugin)
Means of transporting CSS rule declarations from one file to another.

Calling the theft plugin multiple times...

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

...results in the following CSS:

```CSS

.my-button {
  display: inline-block;
  font-weight: 400;
  line-height: 1.25;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: .5rem 1rem;
  font-size: 1rem;
  border-radius: .25rem;
  -webkit-transition: all .2s ease-in-out;
  -o-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
  color: #636c72!important;
  text-transform: uppercase!important;
  background: red!important;
}

```
