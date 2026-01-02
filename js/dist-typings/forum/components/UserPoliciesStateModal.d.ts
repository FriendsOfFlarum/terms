/// <reference types="mithril" />
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import User from 'flarum/common/models/User';
interface UserPoliciesStateModalAttrs extends IInternalModalAttrs {
    user: User;
}
export default class UserPoliciesStateModal extends Modal<UserPoliciesStateModalAttrs> {
    title(): any[];
    className(): string;
    content(): JSX.Element;
}
export {};
