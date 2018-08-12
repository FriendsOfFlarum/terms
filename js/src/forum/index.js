import {extend} from 'flarum/extend';
import app from 'flarum/app';
import Model from 'flarum/Model';
import User from 'flarum/models/User';
import Policy from '../common/models/Policy';
import addAcceptModal from './addAcceptModal';
import addFieldsToRegister from './addFieldsToRegister';
import addUpdateAlert from './addUpdateAlert';
import addUserPoliciesStateControl from './addUserPoliciesStateControl';

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
