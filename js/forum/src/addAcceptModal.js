import app from 'flarum/app';
import {extend} from 'flarum/extend';
import Page from 'flarum/components/Page';
import AcceptPoliciesModal from 'flagrow/terms/components/AcceptPoliciesModal';

export default function () {
    let initialized = false;

    extend(Page.prototype, 'init', function () {
        if (initialized) {
            return;
        }

        initialized = true;

        const user = app.session.user;

        if (user && user.flagrowTermsPoliciesHasUpdate()) {
            app.modal.show(new AcceptPoliciesModal());
        }
    });
}
