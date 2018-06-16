'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;
const modifyPackages = blueprintHelpers.modifyPackages;

const chai = require('ember-cli-blueprint-test-helpers/chai');
const expect = chai.expect;

const generateFakePackageManifest = require('../helpers/generate-fake-package-manifest');
const fixture = require('../helpers/fixture');

describe('Acceptance: generate and destroy model blueprints', function() {
  setupTestHooks(this);

  beforeEach(function() {
    return emberNew().then(() => generateFakePackageManifest('ember-cli-qunit', '4.1.0'));
  });

  it('model', function() {
    let args = ['model', 'foo'];

    return emberGenerateDestroy(args, _file => {
      expect(_file('app/models/foo.js'))
        .to.contain("import { Model } from 'ember-data';")
        .to.contain('export default class Foo extends Model');

      expect(_file('tests/unit/models/foo-test.js')).to.equal(fixture('model-test/foo-default.js'));
    });
  });

  it('model with attrs', function() {
    let args = [
      'model',
      'foo',
      'misc',
      'skills:array',
      'isActive:boolean',
      'birthday:date',
      'someObject:object',
      'age:number',
      'name:string',
      'customAttr:custom-transform',
    ];

    return emberGenerateDestroy(args, _file => {
      expect(_file('app/models/foo.js'))
        .to.contain("import { Model } from 'ember-data';")
        .to.contain('export default class Foo extends Model')
        .to.contain('@attr() misc')
        .to.contain("@attr('array') skills")
        .to.contain("@attr('boolean') isActive")
        .to.contain("@attr('date') birthday")
        .to.contain("@attr('object') someObject")
        .to.contain("@attr('number') age")
        .to.contain("@attr('string') name")
        .to.contain("@attr('custom-transform') customAttr");

      expect(_file('tests/unit/models/foo-test.js')).to.equal(fixture('model-test/foo-default.js'));
    });
  });

  it('model with belongsTo', function() {
    let args = ['model', 'comment', 'post:belongs-to', 'author:belongs-to:user'];

    return emberGenerateDestroy(args, _file => {
      expect(_file('app/models/comment.js'))
        .to.contain("import { Model } from 'ember-data';")
        .to.contain('export default class Comment extends Model')
        .to.contain("@belongsTo('post')")
        .to.contain("@belongsTo('user')");

      expect(_file('tests/unit/models/comment-test.js')).to.equal(
        fixture('model-test/comment-default.js')
      );
    });
  });

  it('model with hasMany', function() {
    let args = ['model', 'post', 'comments:has-many', 'otherComments:has-many:comment'];

    return emberGenerateDestroy(args, _file => {
      expect(_file('app/models/post.js'))
        .to.contain("import { Model } from 'ember-data';")
        .to.contain('export default class Post extends Model')
        .to.contain("@hasMany('comment') comments")
        .to.contain("@hasMany('comment') otherComments");

      expect(_file('tests/unit/models/post-test.js')).to.equal(
        fixture('model-test/post-default.js')
      );
    });
  });

  it('model-test', function() {
    let args = ['model-test', 'foo'];

    return emberGenerateDestroy(args, _file => {
      expect(_file('tests/unit/models/foo-test.js')).to.equal(fixture('model-test/foo-default.js'));
    });
  });

  describe('model-test with ember-cli-qunit@4.2.0', function() {
    beforeEach(function() {
      generateFakePackageManifest('ember-cli-qunit', '4.2.0');
    });

    it('model-test-test foo', function() {
      return emberGenerateDestroy(['model-test', 'foo'], _file => {
        expect(_file('tests/unit/models/foo-test.js')).to.equal(fixture('model-test/rfc232.js'));
      });
    });
  });

  describe('with ember-cli-mocha v0.12+', function() {
    beforeEach(function() {
      modifyPackages([
        { name: 'ember-cli-qunit', delete: true },
        { name: 'ember-cli-mocha', dev: true },
      ]);
      generateFakePackageManifest('ember-cli-mocha', '0.12.0');
    });

    it('model-test for mocha v0.12+', function() {
      let args = ['model-test', 'foo'];

      return emberGenerateDestroy(args, _file => {
        expect(_file('tests/unit/models/foo-test.js')).to.equal(
          fixture('model-test/foo-mocha-0.12.js')
        );
      });
    });
  });
});
