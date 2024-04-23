import Component from 'flarum/common/Component';

export default class ExtensionData extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.keyattr = vnode.attrs.keyattr;
    this.policy = vnode.attrs.policy;
    this.updateAttribute = vnode.attrs.updateAttribute;
    this.children = vnode.children;
  }

  view() {
    let additionalInfo = JSON.parse(this.policy.additionalInfo());

    return (
      <div class={'Form-group'}>
        <label>{this.keyattr}</label>
        {this.children}
      </div>
    );
  }

  onchangevalue(value) {
    this.attrs.onchangevalue(this.keyattr, value, this.value);
  }
}
