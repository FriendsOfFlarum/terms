import Component from 'flarum/common/Component';

export default class ExtensionData extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.keyattr = vnode.attrs.keyattr;
    this.policy = vnode.attrs.policy;
    this.setDirty = vnode.attrs.setDirty;
    this.children = vnode.children;

    this.updateAttribute = this.updateAttribute.bind(this); // Bind this to updateAttribute
  }

  view() {
    let children =
      typeof this.children[0] === 'function'
        ? this.children[0]({ keyattr: this.keyattr, policy: this.policy, updateAttribute: this.updateAttribute })
        : this.children;

    return <div class={'Form-group'}>{children}</div>;
  }

  updateAttribute(value) {
    let attributes = this.policy.additionalInfo();
    attributes[this.keyattr] = value;
    this.policy.pushAttributes({
      ['additionalInfo']: attributes,
    });

    this.setDirty();
  }
}
