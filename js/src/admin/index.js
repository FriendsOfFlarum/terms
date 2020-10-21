import app from 'flarum/app';
import Policy from '../common/models/Policy';
import TermsSettingsModal from './components/TermsSettingsModal';
import addPermissions from './addPermissions';

export * from './components';
export * from '../common/models';
export * from '../common/helpers';

app.initializers.add('fof-terms', app => {
    app.store.models['fof-terms-policies'] = Policy;

    app.extensionSettings['fof-terms'] = () => app.modal.show(TermsSettingsModal);

    addPermissions();
});
