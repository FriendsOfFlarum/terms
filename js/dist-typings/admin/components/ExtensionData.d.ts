import Component, { ComponentAttrs } from 'flarum/common/Component';
import type Mithril from 'mithril';
import Policy from '../../common/models/Policy';
interface ExtensionDataAttrs extends ComponentAttrs {
    keyattr: string;
    policy: Policy;
    setDirty: () => void;
}
export default class ExtensionData extends Component<ExtensionDataAttrs> {
    keyattr: string;
    policy: Policy;
    setDirty: () => void;
    oninit(vnode: Mithril.Vnode<ExtensionDataAttrs, this>): void;
    view(vnode: Mithril.Vnode<ExtensionDataAttrs, this>): JSX.Element;
    updateAttribute(value: any): void;
}
export {};
