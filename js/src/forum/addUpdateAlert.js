import {override} from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage';
import DiscussionPage from 'flarum/components/DiscussionPage';
import UserPage from 'flarum/components/UserPage';
import UpdateAlert from './components/UpdateAlert';

/* global m */

// This single method will be used to inject the alert into existing components
// If the view is already an array, we add our content at the start
// If it isn't an array we wrap the content into a new array
function addAlertToContent(original, ...originalArgs) {
    const existing = original(...originalArgs);
    const additional = m(UpdateAlert);

    // if the existing content is an array, add to it
    // This should only happen with the hero() override as other extensions might return an array there
    if (Array.isArray(existing)) {
        existing.unshift(additional);

        return existing;
    }

    // Otherwise return a new list of elements
    // Use a container div otherwise when extending view() this will prevent the config() method from running
    // as the Component class won't be able to bind config() to an array
    // We could also add to vnode.children but this could cause weird styling if another extension or custom styles
    // change the look of the base page content by targeting the original view root element based on its class
    // By using a new outer container we make sure the alert always stays full width and unaffected by the page view under it
    return m('div', [
        additional,
        existing,
    ]);
}

export default function () {
    // There's no single place we can inject the banner
    // So we use a few different points so it's visible on most pages
    override(IndexPage.prototype, 'hero', addAlertToContent);
    override(DiscussionPage.prototype, 'view', addAlertToContent);

    // Covers user profile and settings
    override(UserPage.prototype, 'view', addAlertToContent);
}
