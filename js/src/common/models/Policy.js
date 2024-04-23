import Model from 'flarum/common/Model';
import computed from 'flarum/common/utils/computed';

export default class Policy extends Model {
  sort = Model.attribute('sort');
  name = Model.attribute('name');
  url = Model.attribute('url');
  update_message = Model.attribute('update_message');
  terms_updated_at = Model.attribute('terms_updated_at');
  optional = Model.attribute('optional');
  additionalInfo = Model.attribute('additionalInfo');
  form_key = computed('id', (id) => 'fof_terms_policy_' + id);

  apiEndpoint() {
    return '/fof/terms/policies' + (this.exists ? '/' + this.data.id : '');
  }
}
