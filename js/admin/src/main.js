import app from 'flarum/app';
import Policy from 'flagrow/terms/models/Policy';
import TermsSettingsModal from 'flagrow/terms/components/TermsSettingsModal';
import addPermissions from 'flagrow/terms/addPermissions';

app.initializers.add('flagrow-terms', app => {
    app.store.models['flagrow-terms-policies'] = Policy;

    app.extensionSettings['flagrow-terms'] = () => app.modal.show(new TermsSettingsModal());

    addPermissions();
});
