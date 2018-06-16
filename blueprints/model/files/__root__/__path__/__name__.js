import { Model } from 'ember-data';
<%= decoratorImport %>

export default class <%= classifiedModuleName %> extends Model {
<%= attrs.length ? '' + attrs : '' %>
}

