import app from 'flarum/app';
import humanTime from 'flarum/helpers/humanTime';
import Modal from 'flarum/components/Modal';
import sortByAttribute from '../../common/helpers/sortByAttribute';

/* global m */

export default class UserPoliciesStateModal extends Modal {
    title() {
        return app.translator.trans('fof-terms.forum.state-modal.title', {
            username: this.props.user.username(),
        });
    }

    content() {
        return m(
            '.Modal-body',
            m(
                'ul',
                sortByAttribute(app.store.all('fof-terms-policies')).map((policy) => {
                    const state = this.props.user.fofTermsPoliciesState()[policy.id()];

                    return m('li', [
                        policy.name() + ': ',
                        state && state.accepted_at
                            ? app.translator.trans('fof-terms.forum.state-modal.accepted-at', {
                                  date: humanTime(state.accepted_at),
                              })
                            : app.translator.trans('fof-terms.forum.state-modal.not-accepted'),
                    ]);
                })
            )
        );
    }
}
