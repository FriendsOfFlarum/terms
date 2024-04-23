import Component from 'flarum/common/Component';

export default class ExtensionData extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.keyattr = vnode.attrs.keyattr;
    this.policy = vnode.attrs.policy;
    this.updateAttribute = vnode.attrs.updateAttribute;
  }

  view() {
    let additionalInfo = JSON.parse(this.policy.additionalInfo());

    return (
      <div class={'Form-group'}>
        <label>{this.keyattr}</label>
        <textarea
          class={'FormControl'}
          value={additionalInfo[this.keyattr] || ''}
          oninput={(val) => {
            if (!this.policy.additionalInfo()) {
              this.updateAttribute('additionalInfo', {});
            }
            let attributes = JSON.parse(this.policy.additionalInfo());
            console.log(attributes);
            attributes.extension4 = val.target.value;

            this.updateAttribute('additionalInfo', JSON.stringify(attributes));
          }}
        />
      </div>
    );
  }

  onchangevalue(value) {
    this.attrs.onchangevalue(this.keyattr, value, this.value);
  }
}
