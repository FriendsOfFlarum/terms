import {extend} from 'flarum/extend';
import app from 'flarum/app';
import PermissionGrid from 'flarum/components/PermissionGrid';

export default function () {
    extend(PermissionGrid.prototype, 'moderateItems', items => {
        items.add('fof-terms-see-user-policies-state', {
            icon: 'fas fa-paperclip',
            label: app.translator.trans('fof-terms.admin.permissions.see-user-policies-state'),
            permission: 'fof-terms.see-user-policies-state',
        });

        items.add('fof-terms-postpone-policies-accept', {
            icon: 'fas fa-paperclip',
            label: app.translator.trans('fof-terms.admin.permissions.postpone-policies-accept'),
            permission: 'fof-terms.postpone-policies-accept',
        });

        items.add('fof-terms-export-policies', {
            icon: 'fas fa-paperclip',
            label: app.translator.trans('fof-terms.admin.permissions.export-policies'),
            permission: 'fof-terms.export-policies',
        });
    });
}
