import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import UpdateAlert from './components/UpdateAlert';
import PageStructure from 'flarum/forum/components/PageStructure';

export default function addUpdateAlert() {
  extend(PageStructure.prototype, 'mainItems', function (items) {
    if (app.session.user?.fofTermsPoliciesHasUpdate()) {
      items.add('updateAlert', <UpdateAlert />, 1001);
    }
  });
}
