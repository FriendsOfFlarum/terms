# Terms by ![Flagrow logo](https://avatars0.githubusercontent.com/u/16413865?v=3&s=20) [Flagrow](https://discuss.flarum.org/d/1832-flagrow-extension-developer-group), a project of [Gravure](https://gravure.io/)

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/flagrow/terms/blob/master/LICENSE.md) [![Latest Stable Version](https://img.shields.io/packagist/v/flagrow/terms.svg)](https://packagist.org/packages/flagrow/terms) [![Total Downloads](https://img.shields.io/packagist/dt/flagrow/terms.svg)](https://packagist.org/packages/flagrow/terms) [![Donate](https://img.shields.io/badge/patreon-support-yellow.svg)](https://www.patreon.com/flagrow) [![Join our Discord server](https://discordapp.com/api/guilds/240489109041315840/embed.png)](https://flagrow.io/join-discord)

This extension allows you to define a list of terms the user must agree to before using the forum.

It was made with the new General Data Protection Regulation in mind but please consult with your legal team to see whether it fits your requirements.

The initial version of this extension was sponsored by [profesionalreview.com](https://www.profesionalreview.com/).

## Installation

Use [Bazaar](https://discuss.flarum.org/d/5151-flagrow-bazaar-the-extension-marketplace) or install manually:

```bash
composer require flagrow/terms
```

## Updating

```bash
composer update flagrow/terms
php flarum migrate
php flarum cache:clear
```

## Configuration

You can define a list of "policies" the users must agree to. A policy has a name and url.

You can define an "update message" that will be shown to users who have not yet agreed to the latest version of the policy or not agreed to the policy at all (this includes users registered before the policy extension was enabled).

You can define an "updated at" time that will ask all users who accepted prior to that date to accept again.

If users don't accept the terms, they can't register. Additionally, if they already have an account, they can login but their account is locked until they accept the latest version of the terms (similar to how the suspend extension blocks users).

You can customize who can skip the modal without accepting the new terms immediately via the permissions tab (by default admins only). You might want to give this permission to bot accounts for example as they will also be blocked from the API if there's a terms update.

Admins can see the date at which a user accepted the terms by going to their profile page and selecting the terms button in the dropdown menu. You can customize who can see those dates in the permissions.

## Raw data

In case you want to export the data (for your GDPR logs for example), you will have to access the database.

The `flagrow_terms_policies` table contains the list of policies and the `flagrow_terms_policy_user` table contains the relationship between the two along with the `accepted_at` timestamp of the moment they accepted it.

## Support our work

We prefer to keep our work available to everyone.
In order to do so we rely on voluntary contributions on [Patreon](https://www.patreon.com/flagrow).

## Security

If you discover a security vulnerability within Terms, please send an email to the Gravure team at security@gravure.io. All security vulnerabilities will be promptly addressed.

Please include as many details as possible. You can use `php flarum info` to get the PHP, Flarum and extension versions installed.

## Links

- [Flarum Discuss post](https://discuss.flarum.org/d/11714-flagrow-terms-ask-your-users-to-accept-tos-and-privacy-policy)
- [Source code on GitHub](https://github.com/flagrow/terms)
- [Report an issue](https://github.com/flagrow/terms/issues)
- [Download via Packagist](https://packagist.org/packages/flagrow/terms)

An extension by [Flagrow](https://flagrow.io/), a project of [Gravure](https://gravure.io/).
