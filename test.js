const postcss = require('postcss');
const theft = require('./index.js');

  postcss([
    
    theft({url:'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css', source: ['.btn', '.text-muted'], target:'.my-button' }),
    theft({url:'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css', source: ['.text-uppercase'], target:'.my-button' }),

    theft({css:`.love-button { background: red ! important; }`, source: ['.love-button'], target:'.my-button' }),


  ])

  .process(`.my-button {}`)

  .then(result => { console.log( result.css ) })
  .catch(err => { console.error( err ) });
