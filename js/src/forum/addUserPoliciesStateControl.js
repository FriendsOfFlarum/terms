import {extend} from 'flarum/extend';
import app from 'flarum/app';
import UserControls from 'flarum/utils/UserControls';
import Button from 'flarum/components/Button';
import UserPoliciesStateModal from './components/UserPoliciesStateModal';

export default function () {
    extend(UserControls, 'moderationControls', (items, user) => {
        if (app.forum.attribute('fof-terms.canSeeUserPoliciesState')) {
            items.add('fof-terms.state', Button.component({
                icon: 'fas fa-paperclip',
                onclick() {
                    app.modal.show(UserPoliciesStateModal, {user});
                },
            }, app.translator.trans('fof-terms.forum.user_controls.state_button')));
        }
    });
}
