// @ts-ignore - no types available for html5sortable
import sortable from 'html5sortable/dist/html5sortable.es.js';
import app from 'flarum/admin/app';
import Component from 'flarum/common/Component';
import type Mithril from 'mithril';
import PolicyEdit from './PolicyEdit';
import sortByAttribute from '../../common/helpers/sortByAttribute';
import Policy from '../../common/models/Policy';

export default class PolicyList extends Component {
  oninit(vnode: Mithril.Vnode) {
    super.oninit(vnode);

    app
      .request({
        method: 'GET',
        url: app.forum.attribute('apiUrl') + '/fof/terms/policies',
      })
      .then((result: any) => {
        app.store.pushPayload(result);

        m.redraw();
      });
  }

  oncreate(vnode: Mithril.VnodeDOM) {
    super.oncreate(vnode);
    this.initsortable(vnode);
  }

  onupdate(vnode: Mithril.VnodeDOM) {
    super.onupdate(vnode);
    // We could do this without re-creating the sortable on every redraw, but the current system works well
    // "If it ain't broken, don't fix it"
    this.initsortable(vnode);
  }

  initsortable(vnode: Mithril.VnodeDOM) {
    const container = vnode.dom.querySelector('.js-policies-container');
    if (container) {
      sortable(container, {
        handle: '.js-policy-handle',
      })[0].addEventListener('sortupdate', () => {
        const sorting = Array.from(vnode.dom.querySelectorAll('.js-policy-data')).map((element) => (element as HTMLElement).dataset.id);

        this.updateSort(sorting as string[]);
      });
    }
  }

  view() {
    const policies = app.store.all<Policy>('fof-terms-policies');

    const fieldsList = sortByAttribute(policies).map((policy) => (
      <div className="js-policy-data" key={policy.id()} data-id={policy.id()}>
        <PolicyEdit policy={policy} />
      </div>
    ));

    return (
      <div>
        <h2>{app.translator.trans('fof-terms.admin.titles.policies')}</h2>
        <div className="FoF-Terms-Policies-Container">
          <div className="js-policies-container">{fieldsList}</div>
          <PolicyEdit policy={null} />
        </div>
      </div>
    );
  }

  updateSort(sorting: string[]) {
    app
      .request({
        method: 'POST',
        url: app.forum.attribute('apiUrl') + '/fof/terms/policies/order',
        body: {
          sort: sorting,
        },
      })
      .then((result: any) => {
        // Update sort attributes
        app.store.pushPayload(result);

        m.redraw();
      });
  }
}
