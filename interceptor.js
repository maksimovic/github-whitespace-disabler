const on = 'On';
const off = 'Off';

var default_settings = {
    'strip_whitespace' : on
};

function on_error(e) {
    console.error(e);
}

const get_stored_settings = browser.storage.local.get();
get_stored_settings.then(function(settings) {
    if (typeof settings.strip_whitespace === 'undefined') {
        browser.storage.local.set(default_settings);
    }

    console.log(settings);
}, on_error);

/**
 * @param {object} requestDetails
 * @param {object} settings
 */
function redirect(requestDetails, settings) {
    var url = new URL(requestDetails.url);

    console.log(settings);
    console.log(requestDetails);

    if (!url.searchParams.has('w') && settings.strip_whitespace === on) {
        url.searchParams.set('w', 1);
    }

    console.log(url.href);

    return {
        redirectUrl : url.href
    };
}

browser.webRequest.onBeforeRequest.addListener(function(requestDetails) {
        var get_settings = browser.storage.local.get();
        get_settings.then(function(settings) {
            return redirect(requestDetails, settings);
        });
    },
    {
        urls : [
            "*://github.com/*/commit/*",
            "*://github.com/*/*/pull/*/files"
        ]
    },
    [ "blocking" ]
);