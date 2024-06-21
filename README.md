# Terms by FriendsOfFlarum

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/FriendsOfFlarum/terms/blob/master/LICENSE.md) [![Latest Stable Version](https://img.shields.io/packagist/v/fof/terms.svg)](https://packagist.org/packages/fof/terms) [![Total Downloads](https://img.shields.io/packagist/dt/fof/terms.svg)](https://packagist.org/packages/fof/terms)

This extension allows you to define a list of terms the user must agree to before using the forum.

It was made with the new General Data Protection Regulation in mind but please consult with your legal team to see whether it fits your requirements.

## Installation

```bash
composer require fof/terms
```

## Updating

```bash
composer require fof/terms:"*"
php flarum migrate
php flarum cache:clear
```

### Updating from Flagrow

This extension replaces [Flagrow Terms](https://packagist.org/packages/flagrow/terms).

To upgrade from the old extension to the new one:

- **Backup your data!** You should backup the database. You can also download Terms' data as JSON, see documentation below.

- Disable the Terms extension in the admin panel.

- Run:

```sh
composer require fof/terms
```

Composer should let you know that `flagrow/terms` has been automatically removed.

- Enable the new extension in the admin panel.

- Your existing data will be migrated to FoF Terms automatically.

## Configuration

You can define a list of "policies" the users must agree to. A policy has a name and url.

You can define an "update message" that will be shown to users who have not yet agreed to the latest version of the policy or not agreed to the policy at all (this includes users registered before the policy extension was enabled).

You can define an "updated at" time that will ask all users who accepted prior to that date to accept again.

If users don't accept the terms, they can't register. Additionally, if they already have an account, they can login but their account is locked until they accept the latest version of the terms (similar to how the suspend extension blocks users).

You can customize who can skip the modal without accepting the new terms immediately via the permissions tab (by default admins only). You might want to give this permission to bot accounts for example as they will also be blocked from the API if there's a terms update.

Admins can see the date at which a user accepted the terms by going to their profile page and selecting the terms button in the dropdown menu. You can customize who can see those dates in the permissions.

## For developers

You can easily add a custom field in PolicyEdit component to integrate fof/terms with other extensions. In 
`fof-terms-policies`, there is a column, `additionalInfo` dedicated to save your custom data into `fof/terms` database.
Data is stored inside one, global JSON object, allowing multiple extensions to save their data. 

```
  additionalInfo JSON object example
  
  {
    "fof/extension-1": "extension1 data",
    "fof/extension-2": true,
    "fof/extension-3": {"extension-3-boolval": false, "extension-3-stringval": "extension-3 data"}
  }
```

You can save any value, as long as it is a primitive or a valid JSON object.

To add your field to `additionalInfo`, you must follow these steps:
1) Choose a custom **key** value, it is recommended to select Your extension's name to avoid naming conflicts. 
2) Prepare a component, which You would want to insert into `PolicyEdit`
3) Extend `PolicyEdit.prototype`'s `fields` method, and add Your component, wrapped inside `ExtensionData` component:
```js
  import { extend } from 'flarum/common/extend';
  import PolicyEdit from 'fof/terms/components/PolicyEdit';
  import ExtensionData from 'fof/terms/components/ExtensionData';
  
  export default function() {
    extend(PolicyEdit.prototype, 'fields', function  (items) {
      const key = 'fof/extension-1';
      const priority = 81;
      
      items.add(
        key,
        <ExtensionData
          keyattr={key}
          policy={this.policy}
          setDirty={() => {
            this.dirty = true;
          }}
        >
          {({ keyattr, policy, updateAttribute }) => 
            <YourComponent 
              keyattr={keyattr} 
              policy={policy} 
              updateAttribute={updateAttribute} 
            />
          }
        </ExtensionData>,
        priority
      )
    });
  }
``` 
As shown above, `ExtensionData` component takes three props:
1) `keyattr` - specified key, usually Your extension's name,
2) `policy` - reference to `policy` object,
3) `setDirty` - reference to function that allows saving the policy, if any change is made

Your component should also take three props:
1) `keyattr` - same as in above
2) `policy` - same as above
3) `updateAttribute` - reference to `ExtensionData`'s method that manages saving Your data into database 
( it is a bit different than `PolicyEdit`'s updateAttribute method )


Your component could look something like this:
```js
import Component from 'flarum/common/Component';

export default class YourComponent extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.keyattr = vnode.attrs.keyattr; 
    this.policy = vnode.attrs.policy; 
    this.updateAttribute = vnode.attrs.updateAttribute;
  }

  view() {
    return (
      <>
        <label>{this.keyattr}</label>
        <textarea
          class={'FormControl'}
          value={this.policy.additionalInfo()[this.keyattr] || ''}
          oninput={(val) => {
            this.updateAttribute(val.target.value);
          }}
        />
      </>
    );
  }
}
```
This example shows a way to save data only as string format: `key: <string>`, however if You want to use data in a more
sophisticated format, there are some rules that should be followed. Let's say You want to save a JSON object instead of 
simple string, in a such form:
`{"boolval": <boolean>,  "stringval": <string>}`.

Here is an example how to obtain such behaviour:

```js
import Component from 'flarum/common/Component';
import Switch from 'flarum/common/components/Switch';

export default class YourSophisticatedComponent extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.keyattr = vnode.attrs.keyattr; 
    this.policy = vnode.attrs.policy; 
    this.updateAttribute = vnode.attrs.updateAttribute;
  }

  view() {
    return (
      <>
        <label>{this.keyattr}</label>
        <Switch
          state={this.policy.additionalInfo()[this.keyattr]?.boolval || false}
          onchange={(val) => {
            let objectAttributes = this.policy.additionalInfo()[this.keyattr];
            if (objectAttributes === undefined) {
              objectAttributes = {};
            }
            objectAttributes['boolval'] = val;
            this.updateAttribute(objectAttributes);
          }}
        >
          boolval
        </Switch>
        <textarea
          class={'FormControl'}
          value={this.policy.additionalInfo()[this.keyattr]?.stringval || ''}
          oninput={(val) => {
            let objectAttributes = this.policy.additionalInfo()[this.keyattr];
            if (objectAttributes === undefined) {
              objectAttributes = {};
            }
            objectAttributes['stringval'] = val.target.value;
            this.updateAttribute(objectAttributes);
          }}
        />
      </>
    );
  }
}
```
Note that `oninput` handler is a bit more complicated - in order to save some subvalue, you need to fetch the whole 
JSON object, assign its subvalue, and then call `this.updateAttribute` method. 
  
As mentioned above, it is possible to store every value imaginable, as long as it is a primitive, or valid JSON object.

## Data Export

In case you want to export the data (for your GDPR logs for example), a JSON and CSV export is available.

The link can be found in the Policy edit form of the admin panel.

If you want to automate the export, the available options are [documented on the wiki](https://github.com/FriendsOfFlarum/terms/wiki/Export-url).

## Links

- [Flarum Discuss post](https://discuss.flarum.org/d/11714)
- [Source code on GitHub](https://github.com/FriendsOfFlarum/terms)
- [Report an issue](https://github.com/FriendsOfFlarum/terms/issues)
- [Download via Packagist](https://packagist.org/packages/fof/terms)

An extension by [FriendsOfFlarum](https://github.com/FriendsOfFlarum)
