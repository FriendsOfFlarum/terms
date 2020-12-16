import app from 'flarum/app';
import Policy from '../common/models/Policy';
import TermsSettingsPage from './components/TermsSettingsPage';

export * from './components';
export * from '../common/models';
export * from '../common/helpers';

app.initializers.add('fof-terms', (app) => {
    app.store.models['fof-terms-policies'] = Policy;

    app.extensionData
        .for('fof-terms')
        .registerPermission(
            {
                icon: 'fas fa-paperclip',
                label: app.translator.trans('fof-terms.admin.permissions.see-user-policies-state'),
                permission: 'fof-terms.see-user-policies-state',
            },
            'moderate'
        )
        .registerPermission(
            {
                icon: 'fas fa-paperclip',
                label: app.translator.trans('fof-terms.admin.permissions.postpone-policies-accept'),
                permission: 'fof-terms.postpone-policies-accept',
            },
            'moderate'
        )
        .registerPermission(
            {
                icon: 'fas fa-paperclip',
                label: app.translator.trans('fof-terms.admin.permissions.export-policies'),
                permission: 'fof-terms.export-policies',
            },
            'moderate'
        )
        .registerPage(TermsSettingsPage);
});
