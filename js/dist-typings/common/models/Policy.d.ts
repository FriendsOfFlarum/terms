import Model from 'flarum/common/Model';
export default class Policy extends Model {
    sort: () => string;
    name: () => string;
    url: () => string;
    updateMessage: () => string;
    termsUpdatedAt: () => string;
    optional: () => boolean;
    additionalInfo: () => unknown;
    form_key: () => string;
}
