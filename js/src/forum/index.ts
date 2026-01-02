import app from 'flarum/forum/app';
import addAcceptModal from './addAcceptModal';
import addFieldsToRegister from './addFieldsToRegister';
import addUpdateAlert from './addUpdateAlert';
import addUserPoliciesStateControl from './addUserPoliciesStateControl';
import addManagePoliciesOption from './components/addManagePoliciesOption';

export { default as extend } from './extend';

app.initializers.add('fof-terms', () => {
  addAcceptModal();
  addFieldsToRegister();
  addUpdateAlert();
  addUserPoliciesStateControl();
  addManagePoliciesOption();
});
