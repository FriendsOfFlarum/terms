import 'html5sortable';

import app from 'flarum/app';
import Component from 'flarum/Component';
import PolicyEdit from './PolicyEdit';
import sortByAttribute from '../../common/helpers/sortByAttribute';

export default class PolicyList extends Component {
    init() {
        app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/flagrow/terms/policies',
        }).then(result => {
            app.store.pushPayload(result);

            m.redraw();
        });
    }

    config() {
        this.$('.js-policies-container')
            .sortable({
                handle: '.js-policy-handle',
            })
            .on('sortupdate', () => {
                const sorting = this.$('.js-policy-data')
                    .map(function () {
                        return $(this).data('id');
                    })
                    .get();

                this.updateSort(sorting);
            });
    }

    view() {
        const policies = app.store.all('flagrow-terms-policies');

        let fieldsList = [];

        sortByAttribute(policies)
            .forEach(policy => {
                // Build array of fields to show.
                fieldsList.push(m('.js-policy-data', {
                    key: policy.id(),
                    'data-id': policy.id(),
                }, PolicyEdit.component({
                    policy,
                })));
            });

        return m('div', [
            m('h2', app.translator.trans('flagrow-terms.admin.titles.policies')),
            m('.Flagrow-Terms-Policies-Container', [
                m('.js-policies-container', fieldsList),
                PolicyEdit.component({
                    key: 'new',
                    policy: null,
                }),
            ]),
        ]);
    }

    updateSort(sorting) {
        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/flagrow/terms/policies/order',
            data: {
                sort: sorting,
            },
        }).then(result => {
            // Update sort attributes
            app.store.pushPayload(result);

            m.redraw();
        });
    }
}
