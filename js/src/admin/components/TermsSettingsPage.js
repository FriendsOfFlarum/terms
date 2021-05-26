import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Switch from 'flarum/common/components/Switch';
import PolicyList from './PolicyList';

const settingsPrefix = 'fof-terms.';
const translationPrefix = 'fof-terms.admin.settings.';

/* global m */

export default class TermsSettingsPage extends ExtensionPage {
    content() {
        return m('.ExtensionPage-settings', [
            m('.container', [
                m('.Form-group', [
                    m('label', app.translator.trans(translationPrefix + 'field.signup-legal-text')),
                    m('textarea.FormControl', {
                        bidi: this.setting(settingsPrefix + 'signup-legal-text'),
                    }),
                ]),
                m('.Form-group', [
                    m(
                        'label',
                        Switch.component(
                            {
                                state: this.setting(settingsPrefix + 'hide-updated-at')() > 0,
                                onchange: this.setting(settingsPrefix + 'hide-updated-at'),
                            },
                            app.translator.trans(translationPrefix + 'field.hide-updated-at')
                        )
                    ),
                ]),
                m('.Form-group', [
                    m('label', app.translator.trans(translationPrefix + 'field.date-format')),
                    m('input[type=text].FormControl', {
                        bidi: this.setting(settingsPrefix + 'date-format'),
                        placeholder: 'YYYY-MM-DD',
                    }),
                    m(
                        '.helpText',
                        app.translator.trans(translationPrefix + 'field.date-format-help', {
                            a: m('a', {
                                href: 'https://day.js.org/docs/en/display/format',
                                target: '_blank',
                            }),
                        })
                    ),
                ]),
                this.submitButton(),
                m(PolicyList),
            ]),
        ]);
    }
}
