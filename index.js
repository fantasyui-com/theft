const path = require('path');
const postcss = require('postcss');
const _request = require('request');
const selectDeclarations = require('select-declarations');

// wrapper for await compatible code
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

    // Option schema
    options = options || {
      force:  undefined, // should create the selector if not found?
      css:    undefined, // code to use is url is not present
      url:    undefined, // url to get code from
      source: undefined, // source selector for url/css
      target: undefined, // target selector in the local file
    };

    // Remote concerns
    const code = options.css||((await request(options.url)).body);
    const declarations = selectDeclarations(code, options.source);

    // Local node(s) to inject remote code into
    const matchingNodeReferences = [];

    // Initial population. Here we are about to learn if nodes matching the target selector were found
    css.walkRules(function (rule) {
      if(rule.selector == options.target){ // note: this is a STRING MATCH
        matchingNodeReferences.push(rule);
      }
    });

    // If nothing is found, and .force is in effect append the rule (selector) that was not found
    if( (matchingNodeReferences.length === 0) && (options.force) ) {
        const newNode = postcss.rule({ selector: options.target });
        css.append(newNode);
        matchingNodeReferences.push(newNode);
    }

    // Finally, append the remote declarations to the local nodes stored in matchingNodeReferences
    matchingNodeReferences.forEach(function (rule) {
      rule.append(declarations.map(i=>i.prop +': '+ i.value+ (i.important?'!important':'') + ';').join('\n'));
    });


  }
});
