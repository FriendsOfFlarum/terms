/// <reference types="flarum/@types/translator-icu-rich" />
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import type Mithril from 'mithril';
interface AcceptPoliciesModalAttrs extends IInternalModalAttrs {
}
export default class AcceptPoliciesModal extends Modal<AcceptPoliciesModalAttrs> {
    [key: string]: any;
    oninit(vnode: Mithril.Vnode<AcceptPoliciesModalAttrs, this>): void;
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    className(): string;
    content(): JSX.Element;
    body(): JSX.Element | JSX.Element[];
}
export {};
