/**
 * @param {object} requestDetails
 */
function redirect(requestDetails) {
    var url = new URL(requestDetails.url);

    if (!url.searchParams.has('w')) {
        url.searchParams.set('w', 1);
    }

    return {
        redirectUrl : url.href
    };
}

browser.webRequest.onBeforeRequest.addListener(
    redirect,
    { urls : [
        "*://github.com/*/commit/*",
        "*://github.com/*/*/pull/*/files"
    ]
    },
    ["blocking"]
);