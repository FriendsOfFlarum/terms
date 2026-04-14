import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import UpdateAlert from './components/UpdateAlert';
import Notices from 'flarum/forum/components/Notices';

export default function addUpdateAlert() {
  extend(Notices.prototype, 'items', function (items) {
    if (app.session.user?.fofTermsPoliciesHasUpdate()) {
      items.add('updateAlert', <UpdateAlert />, 1001);
    }
  });
}
