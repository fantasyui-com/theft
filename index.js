const path = require('path');
const postcss = require('postcss');
const request = require('async-request');
const selectDeclarations = require('select-declarations');

module.exports = postcss.plugin('theft', function theft(options) {
  return async function (css) {
    options = options || {};
    const code = options.css||((await request(options.url)).body);
    const declarations = selectDeclarations(code, options.source);
    css.walkRules(function (rule) {
      if(rule.selector == options.target){
        try {
          const code = declarations.map(i=>i.prop +': '+ i.value+ (i.important?'!important':'') + ';').join('\n');
          rule.append(code);
        } catch(err){
          console.log(err)
        }
      }
  	});
  }
});
