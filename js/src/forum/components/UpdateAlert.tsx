import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import Alert from 'flarum/common/components/Alert';
import Button from 'flarum/common/components/Button';
import type Mithril from 'mithril';

let temporarilyHidden = false;

export default class UpdateAlert extends Component {
  view(): Mithril.Children {
    const { user } = app.session;

    if (temporarilyHidden || !user || !user.fofTermsPoliciesHasUpdate()) {
      return null;
    }

    const mustAccept = user.fofTermsPoliciesMustAccept();
    const hasOnlyOptionalUpdates = !mustAccept && user.fofTermsPoliciesHasUpdate();

    const message = hasOnlyOptionalUpdates
      ? app.translator.trans('fof-terms.forum.update-alert.can-accept-optional-message')
      : mustAccept
        ? app.translator.trans('fof-terms.forum.update-alert.must-accept-message')
        : app.translator.trans('fof-terms.forum.update-alert.can-accept-message');

    return (
      <Alert
        containerClassName="container"
        dismissible={!mustAccept}
        ondismiss={() => {
          temporarilyHidden = true;
          m.redraw();
        }}
        controls={[
          <Button
            className="Button Button--link"
            onclick={() => {
              app.modal.show(() => import('./AcceptPoliciesModal'));
            }}
          >
            {app.translator.trans('fof-terms.forum.update-alert.review')}
          </Button>,
        ]}
      >
        {message}
      </Alert>
    );
  }
}
