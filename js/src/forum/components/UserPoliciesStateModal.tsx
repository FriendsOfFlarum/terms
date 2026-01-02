import app from 'flarum/forum/app';
import humanTime from 'flarum/common/helpers/humanTime';
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import User from 'flarum/common/models/User';
import sortByAttribute from '../../common/helpers/sortByAttribute';
import Policy from '../../common/models/Policy';

interface UserPoliciesStateModalAttrs extends IInternalModalAttrs {
  user: User;
}

export default class UserPoliciesStateModal extends Modal<UserPoliciesStateModalAttrs> {
  title() {
    return app.translator.trans('fof-terms.forum.state-modal.title', {
      username: this.attrs.user.username(),
    });
  }

  className() {
    return 'UserPoliciesStateModal Modal--medium';
  }

  content() {
    return (
      <div className="Modal-body">
        <ul>
          {sortByAttribute(app.store.all<Policy>('fof-terms-policies')).map((policy) => {
            const policyId = policy.id();
            const policiesState = this.attrs.user.fofTermsPoliciesState() as Record<string, any> | undefined;
            const state = policyId && policiesState ? policiesState[policyId] : undefined;

            return (
              <li>
                {policy.name()}:{' '}
                {state && state.accepted_at
                  ? app.translator.trans('fof-terms.forum.state-modal.accepted-at', {
                      date: humanTime(state.accepted_at),
                    })
                  : app.translator.trans('fof-terms.forum.state-modal.not-accepted')}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
