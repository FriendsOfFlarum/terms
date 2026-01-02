import Model from 'flarum/common/Model';
export default class Policy extends Model {
    sort: () => string;
    name: () => string;
    url: () => string;
    update_message: () => string;
    terms_updated_at: () => string;
    optional: () => boolean;
    additional_info: () => unknown;
    form_key: () => string;
    apiEndpoint(): string;
}
