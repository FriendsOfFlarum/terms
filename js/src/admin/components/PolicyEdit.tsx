import app from 'flarum/admin/app';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import Icon from 'flarum/common/components/Icon';
import extractText from 'flarum/common/utils/extractText';
import ItemList from 'flarum/common/utils/ItemList';
import Button from 'flarum/common/components/Button';
import Switch from 'flarum/common/components/Switch';
import type Mithril from 'mithril';
import dayjs from 'dayjs';
import Policy from '../../common/models/Policy';

interface PolicyEditAttrs extends ComponentAttrs {
  policy: Policy | null;
}

export default class PolicyEdit extends Component<PolicyEditAttrs> {
  policy!: Policy;
  dirty: boolean = false;
  processing: boolean = false;
  toggleFields: boolean = false;

  oninit(vnode: Mithril.Vnode<PolicyEditAttrs, this>) {
    super.oninit(vnode);

    this.policy = vnode.attrs.policy!;

    if (this.policy === null) {
      this.initNewField();
    }
  }

  initNewField() {
    this.policy = app.store.createRecord('fof-terms-policies', {
      attributes: {
        name: '',
        url: '',
        updateMessage: '',
        termsUpdatedAt: '',
        optional: false,
        additionalInfo: {},
      },
    }) as Policy;
  }

  boxTitle() {
    if (this.policy.exists) {
      return this.policy.name();
    }

    return app.translator.trans('fof-terms.admin.buttons.new-policy');
  }

  view() {
    return (
      <div className="FoF-Terms-Policy-Box">
        {this.policy.exists && <span className="fas fa-arrows-alt FoF-Terms-Policiy-Box--handle js-policy-handle" />}
        <div
          className="Button Button--block FoF-Terms-Policy-Header"
          onclick={() => {
            this.toggleFields = !this.toggleFields;
          }}
        >
          <div className="FoF-Terms-Policy-Header-Title">{this.boxTitle()}</div>
          <div>
            {this.policy.exists && [app.translator.trans('fof-terms.admin.buttons.edit-policy'), ' ']}
            <Icon name={this.toggleFields ? 'fas fa-chevron-up' : 'fas fa-chevron-down'} />
          </div>
        </div>
        {this.toggleFields && this.viewFields()}
      </div>
    );
  }

  viewFields() {
    return (
      <form className="FoF-Terms-Policy-Body" onsubmit={this.savePolicy.bind(this)}>
        {this.fields().toArray()}
        <div className="ButtonGroup">
          <Button type="submit" className="Button Button--primary" loading={this.processing} disabled={!this.readyToSave()}>
            {app.translator.trans('fof-terms.admin.buttons.' + (this.policy.exists ? 'save' : 'add') + '-policy')}
          </Button>
          {this.policy.exists && (
            <Button type="submit" className="Button Button--danger" loading={this.processing} onclick={(event: Event) => this.deletePolicy(event)}>
              {app.translator.trans('fof-terms.admin.buttons.delete-policy')}
            </Button>
          )}
        </div>
      </form>
    );
  }

  fields(): ItemList<Mithril.Children> {
    const fields = new ItemList<Mithril.Children>();

    fields.add(
      'name',
      <div className="Form-group">
        <label>{app.translator.trans('fof-terms.admin.policies.name')}</label>
        <input
          className="FormControl"
          type="text"
          value={this.policy.name()}
          oninput={(e: InputEvent) => {
            this.updateAttribute('name', (e.target as HTMLInputElement).value);
          }}
        />
        <div className="helpText">{app.translator.trans('fof-terms.admin.policies.name-help')}</div>
      </div>,
      100
    );

    fields.add(
      'url',
      <div className="Form-group">
        <label>{app.translator.trans('fof-terms.admin.policies.url')}</label>
        <input
          className="FormControl"
          type="url"
          value={this.policy.url()}
          oninput={(e: InputEvent) => {
            this.updateAttribute('url', (e.target as HTMLInputElement).value);
          }}
        />
        <div className="helpText">{app.translator.trans('fof-terms.admin.policies.url-help')}</div>
      </div>,
      95
    );

    fields.add(
      'update-message',
      <div className="Form-group">
        <label>{app.translator.trans('fof-terms.admin.policies.update-message')}</label>
        <textarea
          className="FormControl"
          value={this.policy.updateMessage()}
          oninput={(e: InputEvent) => {
            this.updateAttribute('updateMessage', (e.target as HTMLTextAreaElement).value);
          }}
        />
        <div className="helpText">{app.translator.trans('fof-terms.admin.policies.update-message-help')}</div>
      </div>,
      90
    );

    fields.add(
      'terms-updated-at',
      <div className="Form-group">
        <label>{app.translator.trans('fof-terms.admin.policies.terms-updated-at')}</label>
        <div className="FoF-Terms-Input-Group">
          <input
            className="FormControl"
            type="text"
            value={this.policy.termsUpdatedAt()}
            oninput={(e: InputEvent) => {
              this.updateAttribute('termsUpdatedAt', (e.target as HTMLInputElement).value);
            }}
            placeholder={app.translator.trans('fof-terms.admin.policies.terms-updated-at-placeholder')}
          />
          <Button
            className="Button Button--primary"
            onclick={() => {
              // We set the milliseconds to zero because it might otherwise give the impression
              // that we store them, when in fact the date will be stored in a MySQL TIMESTAMP column
              this.updateAttribute('termsUpdatedAt', dayjs().millisecond(0).toISOString());
            }}
          >
            {app.translator.trans('fof-terms.admin.buttons.set-to-now')}
          </Button>
        </div>
        <div className="helpText">{app.translator.trans('fof-terms.admin.policies.terms-updated-at-help')}</div>
      </div>,
      85
    );

    fields.add(
      'optional',
      <div className="Form-group">
        <div className="fof-terms-optional-checkbox">
          <label className="Form-group>label">{app.translator.trans('fof-terms.admin.policies.optional')}</label>
          <Switch
            className="fof-terms-Switch-off"
            state={this.policy.optional()}
            onchange={() => {
              this.updateAttribute('optional', !this.policy.optional());
            }}
          />
        </div>
        <div className="helpText">{app.translator.trans('fof-terms.admin.policies.optional-help')}</div>
      </div>,
      83
    );

    if (this.policy.exists) {
      fields.add(
        'export-url',
        <div className="Form-group">
          <label>{app.translator.trans('fof-terms.admin.policies.export-url')}</label>
          <div className="ButtonGroup">
            {(['json', 'csv'] as const).map((format) => (
              <a
                className="Button FoF-Terms-Export-Button"
                href={app.forum.attribute('apiUrl') + '/fof/terms/policies/' + this.policy.id() + '/export.' + format}
                target="_blank"
              >
                {format.toUpperCase()}
              </a>
            ))}
          </div>
          <div className="helpText">
            {app.translator.trans('fof-terms.admin.policies.export-url-help', {
              a: <a href="https://github.com/FriendsOfFlarum/terms/wiki/Export-url" target="_blank" />,
            })}
          </div>
        </div>,
        80
      );
    }

    return fields;
  }

  updateAttribute(attribute: string, value: any) {
    this.policy.pushAttributes({
      [attribute]: value,
    });
    this.dirty = true;
  }

  readyToSave() {
    return this.dirty;
  }

  submitData() {
    const data: Record<string, any> = {
      name: this.policy.name(),
      url: this.policy.url(),
      updateMessage: this.policy.updateMessage(),
      termsUpdatedAt: this.policy.termsUpdatedAt(),
      optional: this.policy.optional(),
    };

    // Only include sort if it exists (for updates), and ensure it's an integer
    if (this.policy.sort() !== undefined && this.policy.sort() !== null) {
      data.sort = parseInt(this.policy.sort() as any, 10);
    }

    return data;
  }

  savePolicy(event: Event) {
    event.preventDefault();
    this.processing = true;
    const createNewRecord = !this.policy.exists;

    this.policy
      .save(this.submitData())
      .then(() => {
        if (createNewRecord) {
          this.initNewField();
          this.toggleFields = false;
        }

        this.processing = false;
        this.dirty = false;

        m.redraw();
      })
      .catch((err) => {
        this.processing = false;

        throw err;
      });
  }

  deletePolicy(event: Event) {
    event.preventDefault();
    if (
      !confirm(
        extractText(
          app.translator.trans('fof-terms.admin.messages.delete-policy-confirmation', {
            name: this.policy.name(),
          })
        )
      )
    ) {
      return;
    }

    this.processing = true;

    this.policy
      .delete()
      .then(() => {
        this.processing = false;

        m.redraw();
      })
      .catch((err) => {
        this.processing = false;

        throw err;
      });
  }
}
