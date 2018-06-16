Ember ES Class Generators
=========================

Today's ECMAScript classes in Ember... today!

This plugin allows Ember CLI to generate ECMAScript classes along with [ember-decorators](https://github.com/ember-decorators/ember-decorators)

Most of the code was ripped directly from [ember-es-class-generators](https://github.com/typed-ember/ember-es-class-generators).  The vast majority of the effort came from that project; this codebase is merely those generators taken and changes from Typescript to ECMAScript.

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

## License

See [LICENSE.md](LICENSE.md).