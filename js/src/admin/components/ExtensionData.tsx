import Component from 'flarum/common/Component';
import m from 'mithril';

export default class ExtensionData extends Component {
  keyattr: string | undefined;
  value: string | undefined;
  key: string | undefined;
  children: m.Children | undefined;

  oninit(vnode: m.Vnode) {
    super.oninit(vnode);
    //this.value = vnode.attrs.value;
    //this.keyattr = vnode.attrs.key;
    this.children = vnode.children;
  }

  view() {
    return <div class={'Form-group'}>{this.children}</div>;
  }

  onchangevalue(value: string) {
    this.attrs.onchangevalue(this.keyattr, value, this.value);
  }
}
