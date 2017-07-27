const postcss = require('postcss');
const skins = require('skins');

module.exports = postcss.plugin('theft', function theft(options) {
  return function (css) {
    options = options || {
      locations:[],
      selectors:[],
    };
    const theme = options.theme;
    css.walkRules(function (rule) {
      Object.keys(options.selectors).forEach(type=>{
        const selectors = options.selectors[type];
        if(selectors) selectors.forEach(selector=>{
          if(rule.selector == selector){
            try {
              const response = skins({theme, type});
              rule.append(response);
            } catch(err){
              console.log(err)
            }
          }
        })
      })
  	});
  }
});
