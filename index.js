const path = require('path');
const postcss = require('postcss');
const _request = require('request');
const selectDeclarations = require('select-declarations');

function request(url){
  return new Promise(function(resolve, reject) {
    _request(url, function (error, response, body) {
      if(error) return reject(error);
      resolve({response, body})
    });
  });
}

module.exports = postcss.plugin('theft', function theft(options) {
  return async function (css) {

    options = options || {};

    const code = options.css||((await request(options.url)).body);
    const declarations = selectDeclarations(code, options.source);

    let selectorExists = false;
    const matchingNodes = [];

    const appendRule = function (rule) {
      if(rule.selector == options.target){
        try {
          const code = declarations.map(i=>i.prop +': '+ i.value+ (i.important?'!important':'') + ';').join('\n');
          rule.append(code);
        } catch(err){
          console.log(err)
        }
      }
    }

    css.walkRules(function (rule) {
      if(rule.selector == options.target){
        matchingNodes.push(rule);
      }
  	});

    if(matchingNodes.length > 0) selectorExists = true;

    if(selectorExists) {
      matchingNodes.forEach(appendRule);
    }else{
      if(options.force){
        css.append(`\n${options.target} {}`);
        css.walkRules(appendRule);
      }
    }



  }
});
