import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Page from 'flarum/common/components/Page';
import IndexPage from 'flarum/common/components/IndexPage';
import AcceptPoliciesModal from './components/AcceptPoliciesModal';

export default function () {
  let initialized = false;

  extend(Page.prototype, 'oninit', function () {
    if (initialized) {
      return;
    }

    // We only show the modal if the first page loaded was the index page
    // And that new updates are available
    // And that the user *must* accept them
    if (app.current.matches(IndexPage)) {
      const user = app.session.user;

      if (user && user.fofTermsPoliciesMustAccept()) {
        // Timeout is necessary because there is a redraw error otherwise
        setTimeout(() => {
          app.modal.show(AcceptPoliciesModal);
        }, 0);
      }
    }

    initialized = true;
  });
}
