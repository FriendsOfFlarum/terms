import sortable from 'html5sortable/dist/html5sortable.es.js';

import app from 'flarum/app';
import PolicyEdit from './PolicyEdit';
import sortByAttribute from '../../common/helpers/sortByAttribute';

/* global m */

export default class PolicyList {
    oninit() {
        app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/fof/terms/policies',
        }).then((result) => {
            app.store.pushPayload(result);

            m.redraw();
        });
    }

    oncreate(vnode) {
        this.initsortable(vnode);
    }

    onupdate(vnode) {
        // We could do this without re-creating the sortable on every redraw, but the current system works well
        // "If it ain't broken, don't fix it"
        this.initsortable(vnode);
    }

    initsortable(vnode) {
        sortable(vnode.dom.querySelector('.js-policies-container'), {
            handle: '.js-policy-handle',
        })[0].addEventListener('sortupdate', () => {
            const sorting = [].map.call(vnode.dom.querySelectorAll('.js-policy-data'), (element) => element.dataset.id);

            this.updateSort(sorting);
        });
    }

    view() {
        const policies = app.store.all('fof-terms-policies');

        let fieldsList = [];

        sortByAttribute(policies).forEach((policy) => {
            // Build array of fields to show.
            fieldsList.push(
                m(
                    '.js-policy-data',
                    {
                        key: policy.id(),
                        'data-id': policy.id(),
                    },
                    m(PolicyEdit, {
                        policy,
                    })
                )
            );
        });

        return m('div', [
            m('h2', app.translator.trans('fof-terms.admin.titles.policies')),
            m('.FoF-Terms-Policies-Container', [
                m('.js-policies-container', fieldsList),
                m(PolicyEdit, {
                    policy: null,
                }),
            ]),
        ]);
    }

    updateSort(sorting) {
        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/fof/terms/policies/order',
            body: {
                sort: sorting,
            },
        }).then((result) => {
            // Update sort attributes
            app.store.pushPayload(result);

            m.redraw();
        });
    }
}
