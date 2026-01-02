/// <reference types="mithril" />
/**
 * Renders similarly to Flarum's Alert, but with an additional .container inside
 */
export default class UpdateAlert {
    shouldShowAlert(): boolean | null;
    hasOnlyOptionalUpdates(): boolean | null;
    view(): JSX.Element | null;
}
