import Model from 'flarum/common/Model';
import computed from 'flarum/common/utils/computed';

export default class Policy extends Model {
  sort = Model.attribute<string>('sort');
  name = Model.attribute<string>('name');
  url = Model.attribute<string>('url');
  update_message = Model.attribute<string>('update_message');
  terms_updated_at = Model.attribute<string>('terms_updated_at');
  optional = Model.attribute<boolean>('optional');
  additional_info = Model.attribute('additional_info');
  form_key = computed('id', (id) => 'fof_terms_policy_' + id);

  apiEndpoint() {
    return '/fof/terms/policies' + (this.exists ? '/' + this.data.id : '');
  }
}
