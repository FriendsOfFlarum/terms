import app from 'flarum/app';
import {extend} from 'flarum/extend';
import Page from 'flarum/components/Page';
import IndexPage from 'flarum/components/IndexPage';
import AcceptPoliciesModal from './components/AcceptPoliciesModal';

export default function () {
    let initialized = false;

    extend(Page.prototype, 'init', function () {
        if (initialized) {
            return;
        }

        // We only show the modal if the first page loaded was the index page
        // And that new updates are available
        // And that the user *must* accept them
        if (app.current instanceof IndexPage) {
            const user = app.session.user;

            if (user && user.fofTermsPoliciesMustAccept()) {
                app.modal.show(new AcceptPoliciesModal());
            }
        }

        initialized = true;
    });
}
