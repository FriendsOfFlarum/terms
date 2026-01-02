import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import UserControls from 'flarum/forum/utils/UserControls';
import Button from 'flarum/common/components/Button';

export default function () {
  extend(UserControls, 'moderationControls', (items, user) => {
    const fofTerms = app.forum.attribute<{ canSeeUserPoliciesState: boolean }>('fof-terms');

    if (fofTerms?.canSeeUserPoliciesState) {
      items.add(
        'fof-terms.state',
        <Button
          icon="fas fa-paperclip"
          onclick={() => {
            // Lazy load the modal component to reduce initial bundle size
            app.modal.show(() => import('./components/UserPoliciesStateModal'), {
              user,
            });
          }}
        >
          {app.translator.trans('fof-terms.forum.user_controls.state_button')}
        </Button>
      );
    }
  });
}
