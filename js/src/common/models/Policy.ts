import Model from 'flarum/common/Model';
import computed from 'flarum/common/utils/computed';

export default class Policy extends Model {
  sort = Model.attribute<string>('sort');
  name = Model.attribute<string>('name');
  url = Model.attribute<string>('url');
  updateMessage = Model.attribute<string>('updateMessage');
  termsUpdatedAt = Model.attribute<string>('termsUpdatedAt');
  optional = Model.attribute<boolean>('optional');
  additionalInfo = Model.attribute('additionalInfo');
  form_key = computed('id', (id) => 'fof_terms_policy_' + id);
}
