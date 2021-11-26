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
