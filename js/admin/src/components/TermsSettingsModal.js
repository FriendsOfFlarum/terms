import app from 'flarum/app';
import SettingsModal from 'flarum/components/SettingsModal';
import PolicyList from 'flagrow/terms/components/PolicyList';

const settingsPrefix = 'flagrow-terms.';
const translationPrefix = 'flagrow-terms.admin.settings.';

export default class TermsSettingsModal extends SettingsModal {
    title() {
        return app.translator.trans(translationPrefix + 'title');
    }

    form() {
        return [
            m('.Form-group', [
                m('label', app.translator.trans(translationPrefix + 'field.signup-legal-text')),
                m('textarea.FormControl', {
                    bidi: this.setting(settingsPrefix + 'signup-legal-text'),
                }),
            ]),
            PolicyList.component(),
        ];
    }
}
