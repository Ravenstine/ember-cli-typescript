'use strict';

const inflection  = require('inflection'),
      stringUtils = require('ember-cli-string-utils'),
      EOL         = require('os').EOL;

module.exports = {
  description: 'Generates an ECMAScript ember-data model.',

  anonymousOptions: [
    'name',
    'attr:type'
  ],

  locals: function(options) {
    const attrs = [],
          needs = [],
          decorators = {},
          entityOptions = options.entity.options;

    for (var name in entityOptions) {
      let type = entityOptions[name] || '',
          foreignModel = name;
      if (type.indexOf(':') > -1) {
        foreignModel = type.split(':')[1];
        type = type.split(':')[0];
      }
      const dasherizedName                 = stringUtils.dasherize(name),
            camelizedName                  = stringUtils.camelize(name),
            dasherizedType                 = stringUtils.dasherize(type),
            dasherizedForeignModel         = stringUtils.dasherize(foreignModel),
            dasherizedForeignModelSingular = inflection.singularize(dasherizedForeignModel);
      let attr;
      if (/has-many/.test(dasherizedType)) {
        const camelizedNamePlural = inflection.pluralize(camelizedName);
        attr = decAttr(dasherizedForeignModelSingular, dasherizedType);
        attrs.push(attr + ' ' + camelizedNamePlural);
        decorators.hasMany = true;
      } else if (/belongs-to/.test(dasherizedType)) {
        attr = decAttr(dasherizedForeignModel, dasherizedType);
        attrs.push(attr + ' ' + camelizedName);
        decorators.belongsTo = true;
      } else {
        attr = decAttr(dasherizedName, dasherizedType);
        attrs.push(attr + ' ' + camelizedName);
        decorators.attr = true;
      }

      if (/has-many|belongs-to/.test(dasherizedType)) {
        needs.push("'model:" + dasherizedForeignModelSingular + "'");
      }
    }

    const needsDeduplicated = needs.filter(function(need, i) {
      return needs.indexOf(need) === i;
    });

    const decoratorImport = (function(){
      const decoratorNames = Object.keys(decorators);
      if(decoratorNames){
        return `import { ${decoratorNames.join(', ')} } from 'ember-decorators/data';`
      }
      return '';
    })();    

    return {
      attrs: attrs.join(`  ${EOL}`),
      needs: '  needs: [' + needsDeduplicated.join(', ') + ']',
      decoratorImport
    };
  }
};

function decAttr(name, type) {
  switch (type) {
  case 'belongs-to':
    return '@belongsTo(\'' + name + '\')';
  case 'has-many':
    return '@hasMany(\'' + name + '\')';
  case '':
    //"If you don't specify the type of the attribute, it will be whatever was provided by the server"
    //https://emberjs.com/guides/models/defining-models/
    return '@attr()';
  default:
    return '@attr(\'' + type + '\')';
  }
}
