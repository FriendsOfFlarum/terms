import app from 'flarum/app';
import Button from 'flarum/components/Button';
import listItems from 'flarum/helpers/listItems';
import AcceptPoliciesModal from './AcceptPoliciesModal';

/* global m */

let temporarilyHidden = false;

/**
 * Renders similarly to Flarum's Alert, but with an additional .container inside
 */
export default class UpdateAlert {
    shouldShowAlert() {
        if (temporarilyHidden) {
            return false;
        }

        const user = app.session.user;

        return user && user.fofTermsPoliciesHasUpdate();
    }

    view() {
        if (!this.shouldShowAlert()) {
            return m('div');
        }

        const controls = [
            Button.component(
                {
                    className: 'Button Button--link',
                    onclick: () => {
                        app.modal.show(AcceptPoliciesModal);
                    },
                },
                app.translator.trans('fof-terms.forum.update-alert.review')
            ),
        ];

        const dismissControl = [];

        if (!app.session.user.fofTermsPoliciesMustAccept()) {
            dismissControl.push(
                Button.component({
                    icon: 'fas fa-times',
                    className: 'Button Button--link Button--icon Alert-dismiss',
                    onclick: () => {
                        temporarilyHidden = true;
                    },
                })
            );
        }

        return m(
            '.Alert.Alert-info',
            m('.container', [
                m(
                    'span.Alert-body',
                    app.session.user.fofTermsPoliciesMustAccept()
                        ? app.translator.trans('fof-terms.forum.update-alert.must-accept-message')
                        : app.translator.trans('fof-terms.forum.update-alert.can-accept-message')
                ),
                m('ul.Alert-controls', listItems(controls.concat(dismissControl))),
            ])
        );
    }
}
