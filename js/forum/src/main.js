import {extend} from 'flarum/extend';
import app from 'flarum/app';
import Model from 'flarum/Model';
import User from 'flarum/models/User';
import Policy from 'flagrow/terms/models/Policy';
import addAcceptModal from 'flagrow/terms/addAcceptModal';
import addFieldsToRegister from 'flagrow/terms/addFieldsToRegister';
import addUpdateAlert from 'flagrow/terms/addUpdateAlert';
import addUserPoliciesStateControl from 'flagrow/terms/addUserPoliciesStateControl';

app.initializers.add('flagrow-terms', () => {
    app.store.models['flagrow-terms-policies'] = Policy;

    User.prototype.flagrowTermsPoliciesState = Model.attribute('flagrowTermsPoliciesState');
    User.prototype.flagrowTermsPoliciesHasUpdate = Model.attribute('flagrowTermsPoliciesHasUpdate');
    User.prototype.flagrowTermsPoliciesMustAccept = Model.attribute('flagrowTermsPoliciesMustAccept');
    User.prototype.seeFlagrowTermsPoliciesState = Model.attribute('seeFlagrowTermsPoliciesState');

    addAcceptModal();
    addFieldsToRegister();
    addUpdateAlert();
    addUserPoliciesStateControl();
});
