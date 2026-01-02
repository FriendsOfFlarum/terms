/// <reference types="mithril" />
/// <reference types="flarum/@types/translator-icu-rich" />
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import User from 'flarum/common/models/User';
interface UserPoliciesStateModalAttrs extends IInternalModalAttrs {
    user: User;
}
export default class UserPoliciesStateModal extends Modal<UserPoliciesStateModalAttrs> {
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    className(): string;
    content(): JSX.Element;
}
export {};
