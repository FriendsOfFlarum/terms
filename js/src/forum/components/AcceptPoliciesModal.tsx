import app from 'flarum/forum/app';
import { IFormModalAttrs } from 'flarum/common/components/FormModal';
import FormModal from 'flarum/common/components/FormModal';
import Button from 'flarum/common/components/Button';
import type Mithril from 'mithril';
import sortByAttribute from '../../common/helpers/sortByAttribute';
import Policy from '../../common/models/Policy';
import dayjs from 'dayjs';

interface AcceptPoliciesModalAttrs extends IFormModalAttrs {}

export default class AcceptPoliciesModal extends FormModal<AcceptPoliciesModalAttrs> {
  [key: string]: any;

  oninit(vnode: Mithril.Vnode<AcceptPoliciesModalAttrs, this>) {
    super.oninit(vnode);

    app.store.all<Policy>('fof-terms-policies').forEach((policy) => {
      const policyId = policy.id();
      const policiesState = app.session.user?.fofTermsPoliciesState() as Record<string, any> | undefined;
      const state = policyId && policiesState ? policiesState[policyId] : undefined;
      // For optional policies, maintain current acceptance status
      this[policy.form_key()] = policy.optional() ? state?.is_accepted || false : false;
    });
  }

  title() {
    return app.translator.trans('fof-terms.forum.accept-modal.title');
  }

  className() {
    return 'AcceptPoliciesModal Modal--medium';
  }

  content() {
    return <div className="Modal-body">{this.body()}</div>;
  }

  body() {
    const policies = sortByAttribute(
      app.store.all<Policy>('fof-terms-policies').filter((policy) => {
        const policyId = policy.id();
        const policiesState = app.session.user?.fofTermsPoliciesState() as Record<string, any> | undefined;
        const state = policyId && policiesState ? policiesState[policyId] : undefined;

        return !state || state.has_update;
      })
    );

    if (policies.length === 0) {
      return (
        <Button
          className="Button"
          onclick={() => {
            app.modal.close();
          }}
        >
          {app.translator.trans('fof-terms.forum.accept-modal.close')}
        </Button>
      );
    }

    return policies.map((policy) => (
      <div>
        <h2>{policy.name()}</h2>
        {app.forum.attribute<boolean>('fof-terms.hide-updated-at') ? null : (
          <p>
            {policy.termsUpdatedAt()
              ? app.translator.trans('fof-terms.forum.accept-modal.updated-at', {
                  date: dayjs(policy.termsUpdatedAt()).format(app.forum.attribute<string>('fof-terms.date-format')),
                })
              : app.translator.trans('fof-terms.forum.accept-modal.updated-recently')}
          </p>
        )}
        {policy.updateMessage() ? <p>{policy.updateMessage()}</p> : null}
        <div className="Form-group">
          <div className="FoF-Terms-Check FoF-Terms-Check--login">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={this[policy.form_key()]}
                onchange={() => {
                  this[policy.form_key()] = !this[policy.form_key()];
                }}
              />
              {app.translator.trans('fof-terms.forum.accept-modal.i-accept', {
                policy: policy.name(),
                a: policy.url() ? <a href={policy.url()} target="_blank" /> : <span />,
              })}
            </label>
          </div>
        </div>
        <Button
          className="Button Button--primary"
          disabled={!this[policy.form_key()] && !policy.optional()}
          onclick={() => {
            // We need to save the "must accept" property before performing the request
            // Because an updated user serializer will be returned
            const hadToAcceptToInteract = app.session.user?.fofTermsPoliciesMustAccept();

            app
              .request({
                url: app.forum.attribute('apiUrl') + '/fof-terms-policies/' + policy.id() + (this[policy.form_key()] ? '/accept' : '/decline'),
                method: 'POST',
                errorHandler: this.onerror.bind(this),
              })
              .then((updated: any) => {
                app.store.pushPayload(updated);

                // If this was the last policy to accept, close the modal
                if (policies.length === 1) {
                  if (hadToAcceptToInteract) {
                    // If the user was previously not allowed to interact with the forum,
                    // we refresh to get updated permissions in the frontend
                    window.location.reload();
                  } else {
                    app.modal.close();
                  }
                }

                m.redraw();
              });
          }}
        >
          {app.translator.trans('fof-terms.forum.accept-modal.accept')}
        </Button>
      </div>
    ));
  }
}
