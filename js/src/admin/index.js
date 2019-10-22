import app from 'flarum/app';
import Policy from '../common/models/Policy';
import TermsSettingsModal from './components/TermsSettingsModal';
import addPermissions from './addPermissions';

app.initializers.add('fof-terms', app => {
    app.store.models['fof-terms-policies'] = Policy;

    app.extensionSettings['fof-terms'] = () => app.modal.show(new TermsSettingsModal());

    addPermissions();
});
