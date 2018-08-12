import {extend} from 'flarum/extend';
import app from 'flarum/app';
import PermissionGrid from 'flarum/components/PermissionGrid';

export default function () {
    extend(PermissionGrid.prototype, 'moderateItems', items => {
        items.add('flagrow-terms-see-user-policies-state', {
            icon: 'fas fa-paperclip',
            label: app.translator.trans('flagrow-terms.admin.permissions.see-user-policies-state'),
            permission: 'flagrow-terms.see-user-policies-state',
        });

        items.add('flagrow-terms-postpone-policies-accept', {
            icon: 'fas fa-paperclip',
            label: app.translator.trans('flagrow-terms.admin.permissions.postpone-policies-accept'),
            permission: 'flagrow-terms.postpone-policies-accept',
        });

        items.add('flagrow-terms-export-policies', {
            icon: 'fas fa-paperclip',
            label: app.translator.trans('flagrow-terms.admin.permissions.export-policies'),
            permission: 'flagrow-terms.export-policies',
        });
    });
}
