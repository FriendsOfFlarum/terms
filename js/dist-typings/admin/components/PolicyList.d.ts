import Component from 'flarum/common/Component';
import type Mithril from 'mithril';
export default class PolicyList extends Component {
    oninit(vnode: Mithril.Vnode): void;
    oncreate(vnode: Mithril.VnodeDOM): void;
    onupdate(vnode: Mithril.VnodeDOM): void;
    initsortable(vnode: Mithril.VnodeDOM): void;
    view(): JSX.Element;
    updateSort(sorting: string[]): void;
}
