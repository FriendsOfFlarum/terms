import {extend} from 'flarum/extend';
import app from 'flarum/app';
import UserControls from 'flarum/utils/UserControls';
import Button from 'flarum/components/Button';
import UserPoliciesStateModal from 'flagrow/terms/components/UserPoliciesStateModal';

export default function () {
    extend(UserControls, 'moderationControls', (items, user) => {
        if (app.forum.attribute('flagrow-terms.canSeeUserPoliciesState')) {
            items.add('flagrow-terms.state', Button.component({
                icon: 'paperclip',
                children: app.translator.trans('flagrow-terms.forum.user_controls.state_button'),
                onclick() {
                    app.modal.show(new UserPoliciesStateModal({user}));
                },
            }));
        }
    });
}
