import {extend} from 'flarum/extend';
import app from 'flarum/app';
import Model from 'flarum/Model';
import User from 'flarum/models/User';
import Policy from '../common/models/Policy';
import addAcceptModal from './addAcceptModal';
import addFieldsToRegister from './addFieldsToRegister';
import addUpdateAlert from './addUpdateAlert';
import addUserPoliciesStateControl from './addUserPoliciesStateControl';

app.initializers.add('fof-terms', () => {
    app.store.models['fof-terms-policies'] = Policy;

    User.prototype.fofTermsPoliciesState = Model.attribute('fofTermsPoliciesState');
    User.prototype.fofTermsPoliciesHasUpdate = Model.attribute('fofTermsPoliciesHasUpdate');
    User.prototype.fofTermsPoliciesMustAccept = Model.attribute('fofTermsPoliciesMustAccept');
    User.prototype.seeFoFTermsPoliciesState = Model.attribute('seeFoFTermsPoliciesState');

    addAcceptModal();
    addFieldsToRegister();
    addUpdateAlert();
    addUserPoliciesStateControl();
});
