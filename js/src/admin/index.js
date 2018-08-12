import 'jquery-sortable';
import app from 'flarum/app';
import Policy from '../common/models/Policy';
import TermsSettingsModal from './components/TermsSettingsModal';
import addPermissions from './addPermissions';

app.initializers.add('flagrow-terms', app => {
    app.store.models['flagrow-terms-policies'] = Policy;

    app.extensionSettings['flagrow-terms'] = () => app.modal.show(new TermsSettingsModal());

    addPermissions();
});
