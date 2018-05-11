import app from 'flarum/app';
import Component from 'flarum/Component';
import Alert from 'flarum/components/Alert';
import Button from 'flarum/components/Button';
import AcceptPoliciesModal from 'flagrow/terms/components/AcceptPoliciesModal';

class AlertWithContainer extends Alert {
    view() {
        const vdom = super.view();

        vdom.children = [
            m('.container', vdom.children),
        ];

        return vdom;
    }
}

let temporarilyHidden = false;

export default class UpdateAlert extends Component {
    shouldShowAlert() {
        if (temporarilyHidden) {
            return false;
        }

        const user = app.session.user;

        return user && user.flagrowTermsPoliciesHasUpdate();
    }

    view() {
        if (!this.shouldShowAlert()) {
            return m('div');
        }

        return AlertWithContainer.component({
            type: 'info',
            children: app.session.user.flagrowTermsPoliciesMustAccept() ?
                app.translator.trans('flagrow-terms.forum.update-alert.must-accept-message') :
                app.translator.trans('flagrow-terms.forum.update-alert.can-accept-message'),
            controls: [
                Button.component({
                    className: 'Button Button--link',
                    children: app.translator.trans('flagrow-terms.forum.update-alert.review'),
                    onclick: () => {
                        app.modal.show(new AcceptPoliciesModal());
                    },
                }),
            ],
            dismissible: !app.session.user.flagrowTermsPoliciesMustAccept(),
            ondismiss() {
                temporarilyHidden = true;
            },
        });
    }
}
