import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Form from 'flarum/common/components/Form';
import type Mithril from 'mithril';
import PolicyList from './PolicyList';
import Link from 'flarum/common/components/Link';

const settingsPrefix = 'fof-terms.';
const translationPrefix = 'fof-terms.admin.settings.';

export default class TermsSettingsPage extends ExtensionPage {
  content(vnode: Mithril.VnodeDOM) {
    return (
      <div className="ExtensionPage-settings">
        <div className="container">
          <Form>
            <div className="Form-group">
              {this.buildSettingComponent({
                type: 'textarea',
                setting: settingsPrefix + 'signup-legal-text',
                label: app.translator.trans(translationPrefix + 'field.signup-legal-text'),
              })}
            </div>
            <div className="Form-group">
              {this.buildSettingComponent({
                type: 'boolean',
                setting: settingsPrefix + 'hide-updated-at',
                label: app.translator.trans(translationPrefix + 'field.hide-updated-at'),
              })}
            </div>

            <div className="Form-group">
              {this.buildSettingComponent({
                type: 'text',
                setting: settingsPrefix + 'date-format',
                label: app.translator.trans(translationPrefix + 'field.date-format'),
                placeholder: 'YYYY-MM-DD',
                help: app.translator.trans(translationPrefix + 'field.date-format-help', {
                  a: <Link href="https://day.js.org/docs/en/display/format" target="_blank" external={true} />,
                }),
              })}
            </div>

            <div className="Form-group Form-controls">{this.submitButton()}</div>
          </Form>

          <PolicyList />
        </div>
      </div>
    );
  }
}
