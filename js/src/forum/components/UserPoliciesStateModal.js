import app from 'flarum/app';
import extractText from 'flarum/utils/extractText';
import Modal from 'flarum/components/Modal';
import sortByAttribute from '../../common/helpers/sortByAttribute';

/* global m, moment */

export default class UserPoliciesStateModal extends Modal {
    init() {
        super.init();
    }

    title() {
        return app.translator.trans('fof-terms.forum.state-modal.title', {
            username: this.props.user.username(),
        });
    }

    content() {
        return m('.Modal-body', m('ul', sortByAttribute(app.store.all('fof-terms-policies')).map(policy => {
            const state = this.props.user.fofTermsPoliciesState()[policy.id()];

            return m('li', policy.name() + ': ' + (state && state.accepted_at ? extractText(app.translator.trans('fof-terms.forum.state-modal.accepted-at', {
                date: moment(state.accepted_at).format(app.forum.attribute('fof-terms.date-format')) + ' (' + state.accepted_at + ')',
            })) : app.translator.trans('fof-terms.forum.state-modal.not-accepted')));
        })));
    }
}
