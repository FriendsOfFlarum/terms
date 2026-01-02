import { IFormModalAttrs } from 'flarum/common/components/FormModal';
import FormModal from 'flarum/common/components/FormModal';
import type Mithril from 'mithril';
interface AcceptPoliciesModalAttrs extends IFormModalAttrs {
}
export default class AcceptPoliciesModal extends FormModal<AcceptPoliciesModalAttrs> {
    [key: string]: any;
    oninit(vnode: Mithril.Vnode<AcceptPoliciesModalAttrs, this>): void;
    title(): string | any[];
    className(): string;
    content(): JSX.Element;
    body(): JSX.Element | JSX.Element[];
}
export {};
