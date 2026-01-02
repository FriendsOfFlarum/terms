import Component, { ComponentAttrs } from 'flarum/common/Component';
import type Mithril from 'mithril';
import Policy from '../../common/models/Policy';

interface ExtensionDataAttrs extends ComponentAttrs {
  keyattr: string;
  policy: Policy;
  setDirty: () => void;
}

export default class ExtensionData extends Component<ExtensionDataAttrs> {
  keyattr!: string;
  policy!: Policy;
  setDirty!: () => void;

  oninit(vnode: Mithril.Vnode<ExtensionDataAttrs, this>) {
    super.oninit(vnode);
    this.keyattr = vnode.attrs.keyattr;
    this.policy = vnode.attrs.policy;
    this.setDirty = vnode.attrs.setDirty;

    this.updateAttribute = this.updateAttribute.bind(this); // Bind this to updateAttribute
  }

  view(vnode: Mithril.Vnode<ExtensionDataAttrs, this>) {
    let children = vnode.children;

    if (vnode.children && Array.isArray(vnode.children) && typeof vnode.children[0] === 'function') {
      children = (vnode.children[0] as any)({ keyattr: this.keyattr, policy: this.policy, updateAttribute: this.updateAttribute });
    }

    return <div className="Form-group">{children}</div>;
  }

  updateAttribute(value: any) {
    let attributes = this.policy.additionalInfo() as Record<string, any>;
    attributes[this.keyattr] = value;
    this.policy.pushAttributes({
      additionalInfo: attributes,
    });

    this.setDirty();
  }
}
