import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Switch from 'flarum/common/components/Switch';
import type Mithril from 'mithril';
import PolicyList from './PolicyList';

const settingsPrefix = 'fof-terms.';
const translationPrefix = 'fof-terms.admin.settings.';

export default class TermsSettingsPage extends ExtensionPage {
  content(vnode: Mithril.VnodeDOM) {
    return (
      <div className="ExtensionPage-settings">
        <div className="container">
          <div className="Form-group">
            <label>{app.translator.trans(translationPrefix + 'field.signup-legal-text')}</label>
            <textarea className="FormControl" bidi={this.setting(settingsPrefix + 'signup-legal-text')} />
          </div>
          <div className="Form-group">
            <label>
              <Switch state={this.setting(settingsPrefix + 'hide-updated-at')() > 0} onchange={this.setting(settingsPrefix + 'hide-updated-at')}>
                {app.translator.trans(translationPrefix + 'field.hide-updated-at')}
              </Switch>
            </label>
          </div>
          <div className="Form-group">
            <label>{app.translator.trans(translationPrefix + 'field.date-format')}</label>
            <input type="text" className="FormControl" bidi={this.setting(settingsPrefix + 'date-format')} placeholder="YYYY-MM-DD" />
            <div className="helpText">
              {app.translator.trans(translationPrefix + 'field.date-format-help', {
                a: <a href="https://day.js.org/docs/en/display/format" target="_blank" />,
              })}
            </div>
          </div>
          {this.submitButton()}
          <PolicyList />
        </div>
      </div>
    );
  }
}
