import app from 'flarum/forum/app';
import Model from 'flarum/common/Model';
import User from 'flarum/common/models/User';
import Policy from '../common/models/Policy';
import addAcceptModal from './addAcceptModal';
import addFieldsToRegister from './addFieldsToRegister';
import addUpdateAlert from './addUpdateAlert';
import addUserPoliciesStateControl from './addUserPoliciesStateControl';
import addManagePoliciesOption from './components/addManagePoliciesOption';

export * from './components';
export * from '../common/models';
export * from '../common/helpers';

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
  addManagePoliciesOption();
});
