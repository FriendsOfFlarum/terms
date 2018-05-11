import {override} from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage';
import DiscussionPage from 'flarum/components/DiscussionPage';
import UserPage from 'flarum/components/UserPage';
import UpdateAlert from 'flagrow/terms/components/UpdateAlert';

// This single method will be used to inject the alert into existing components
// If the view is already an array, we add our content at the start
// If it isn't an array we wrap the content into a new array
function addAlertToContent(original) {
    const existing = original();
    const additional = UpdateAlert.component();

    if (Array.isArray(existing)) {
        existing.unshift(additional);

        return existing;
    }

    return [
        additional,
        existing,
    ];
}

export default function () {
    // There's no single place we can inject the banner
    // So we use a few different points so it's visible on most pages
    override(IndexPage.prototype, 'hero', addAlertToContent);
    override(DiscussionPage.prototype, 'view', addAlertToContent);

    // Covers user profile and settings
    override(UserPage.prototype, 'view', addAlertToContent);
}
