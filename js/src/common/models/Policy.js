import Model from 'flarum/Model';
import mixin from 'flarum/utils/mixin';
import computed from 'flarum/utils/computed';

export default class Policy extends mixin(Model, {
    sort: Model.attribute('sort'),
    name: Model.attribute('name'),
    url: Model.attribute('url'),
    update_message: Model.attribute('update_message'),
    terms_updated_at: Model.attribute('terms_updated_at', Model.transformDate),
    form_key: computed('id', id => 'flagrow_terms_policy_' + id),
}) {
    /**
     * @inheritDoc
     */
    apiEndpoint() {
        return '/flagrow/terms/policies' + (this.exists ? '/' + this.data.id : '');
    }
}
