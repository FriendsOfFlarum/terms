/// <reference types="flarum/@types/translator-icu-rich" />
import Component, { ComponentAttrs } from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
import Policy from '../../common/models/Policy';
interface PolicyEditAttrs extends ComponentAttrs {
    policy: Policy | null;
}
export default class PolicyEdit extends Component<PolicyEditAttrs> {
    policy: Policy;
    dirty: boolean;
    processing: boolean;
    toggleFields: boolean;
    oninit(vnode: Mithril.Vnode<PolicyEditAttrs, this>): void;
    initNewField(): void;
    boxTitle(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    view(): JSX.Element;
    viewFields(): JSX.Element;
    fields(): ItemList<Mithril.Children>;
    updateAttribute(attribute: string, value: any): void;
    readyToSave(): boolean;
    savePolicy(event: Event): void;
    deletePolicy(event: Event): void;
}
export {};
