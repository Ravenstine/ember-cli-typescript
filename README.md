Ember ES Class Generators
=========================

Today's ECMAScript classes in Ember... today!

See the RFC: https://github.com/emberjs/rfcs/blob/master/text/0240-es-classes.md

This plugin allows Ember CLI to generate ECMAScript classes along with [ember-decorators](https://github.com/ember-decorators/ember-decorators)

Most of the code was ripped directly from [ember-cli-typescript](https://github.com/typed-ember/ember-cli-typescript).  The vast majority of the effort came from that project; this codebase is merely those generators taken and changes from Typescript to ECMAScript.

## Installation

```sh
ember install ember-es-class-generators
```

## Example

```sh
ember g model foo name:string birthday:date friends:hasMany
```

```javascript
import { Model } from 'ember-data';

import { attr, hasMany } from 'ember-decorators/data';

export default class Foo extends Model {
  @attr('string) name
  @attr('date') birthday
  @hasMany('foo') friends
}
```

## Notes

You may have problems using this plugin(or rather ES classes) if you are not using Ember 3.0 or greater.

## License

See [LICENSE.md](LICENSE.md).