*This is obsolete with the Octane edition of Ember.  Do not use this.*

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
  @attr('string') name
  @attr('date') birthday
  @hasMany('foo') friends
}
```

## Notes

You may have problems using this plugin(or rather ES classes) if you are not using Ember 3.0 or greater.  Even so, it's not unlikely you'll encounter issues.

The native class roadmap linked below has some examples of unresolved questions around ES class behavior:

https://github.com/pzuraq/emberjs-rfcs/blob/b47e7f9ec4f02c7d27d50de64691130e7d22747d/text/0000-native-class-roadmap.md

## License

See [LICENSE.md](LICENSE.md).
