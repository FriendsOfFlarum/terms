import app from 'flarum/app';
import Modal from 'flarum/components/Modal';
import sortByAttribute from '../../common/helpers/sortByAttribute';

export default class UserPoliciesStateModal extends Modal {
    init() {
        super.init();
    }

    title() {
        return app.translator.trans('flagrow-terms.forum.state-modal.title', {
            username: this.props.user.username(),
        });
    }

    content() {
        return m('.Modal-body', m('ul', sortByAttribute(app.store.all('flagrow-terms-policies')).map(policy => {
            const state = this.props.user.flagrowTermsPoliciesState()[policy.id()];

            return m('li', policy.name() + ': ' + (state && state.accepted_at ? app.translator.trans('flagrow-terms.forum.state-modal.accepted-at', {
                date: moment(state.accepted_at).format(app.forum.attribute('flagrow-terms.date-format')) + ' (' + state.accepted_at + ')',
            }).join('') : app.translator.trans('flagrow-terms.forum.state-modal.not-accepted')));
        })));
    }
}
