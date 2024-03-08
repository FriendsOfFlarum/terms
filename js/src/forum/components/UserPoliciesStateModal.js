import app from 'flarum/forum/app';
import humanTime from 'flarum/common/helpers/humanTime';
import Modal from 'flarum/common/components/Modal';
import sortByAttribute from '../../common/helpers/sortByAttribute';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';

/* global m */

export default class UserPoliciesStateModal extends Modal {
  user = null;
  loading = false;

  oninit(vnode) {
    super.oninit(vnode);

    if (this.attrs.user.fofTermsPoliciesState() === undefined) {
      this.loading = true;
      app.store.find('users', this.attrs.user.id()).then((user) => {
        this.user = user;
        this.loading = false;
        m.redraw();
      });
    } else {
      this.user = this.attrs.user;
    }
  }

  title() {
    return app.translator.trans('fof-terms.forum.state-modal.title', {
      username: this.attrs.user.username(),
    });
  }

  content() {
    if (this.loading) {
      return (
        <div className="Modal-body">
          <LoadingIndicator />
        </div>
      );
    }

    return m(
      '.Modal-body',
      m(
        'ul',
        sortByAttribute(app.store.all('fof-terms-policies')).map((policy) => {
          const state = this.user.fofTermsPoliciesState()[policy.id()];

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
