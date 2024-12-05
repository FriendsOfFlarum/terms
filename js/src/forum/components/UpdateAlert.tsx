import app from 'flarum/forum/app';
import Button from 'flarum/common/components/Button';
import listItems from 'flarum/common/helpers/listItems';
import AcceptPoliciesModal from './AcceptPoliciesModal';

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
    if (!this.shouldShowAlert() || !app.session.user) {
      return null;
    }

    const controls = [
      <Button
        className="Button Button--link"
        onclick={() => {
          app.modal.show(AcceptPoliciesModal);
        }}
      >
        {app.translator.trans('fof-terms.forum.update-alert.review')}
      </Button>,
    ];

    const dismissControl = [];

    if (!app.session.user.fofTermsPoliciesMustAccept()) {
      dismissControl.push(
        <Button
          icon="fas fa-times"
          className="Button Button--link Button--icon Alert-dismiss"
          onclick={() => {
            temporarilyHidden = true;
          }}
          aria-label={app.translator.trans('fof-terms.forum.update-alert.close')}
        />
      );
    }

    return (
      <div className="Alert Alert-info">
        <div className="container">
          <span className="Alert-body">
            {app.session.user.fofTermsPoliciesMustAccept()
              ? app.translator.trans('fof-terms.forum.update-alert.must-accept-message')
              : app.translator.trans('fof-terms.forum.update-alert.can-accept-message')}
          </span>
          <ul className="Alert-controls">{listItems(controls.concat(dismissControl))}</ul>
        </div>
      </div>
    );
  }
}
