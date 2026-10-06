const BLOCKED_SITES = [
    "instagram.com",
    "facebook.com",
    "tiktok.com",
    "reddit.com"
];

chrome.webNavigation.onBeforeNavigate.addListener((details) => {

    if (details.frameId !== 0) {
        return;
    }

    let hostname;

    try {
        hostname = new URL(details.url)
            .hostname
            .replace(/^www\./, "");
    }
    catch {
        return;
    }

    const blocked = BLOCKED_SITES.some(site =>
        hostname === site ||
        hostname.endsWith("." + site)
    );

    if (!blocked) {
        return;
    }

    const blockPage =
        "https://YOURUSERNAME.github.io/blocked-page/" +
        "?site=" + encodeURIComponent(hostname) +
        "&url=" + encodeURIComponent(details.url);

    chrome.tabs.update(
        details.tabId,
        {
            url: blockPage
        }
    );

});
