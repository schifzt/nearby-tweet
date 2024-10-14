let unit = null;
let pm = null;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // Expect $tweet_url of the form ["", "{username}", "status", "{tweet_id}"].
    const tweet_url = location.pathname.split('/');
    if (tweet_url.length != 4) {
        return;
    }
    if (!(request.from == "popup" || request.from == "background")) {
        return;
    }

    // Receive $unit and $pm from popup.js
    if (request.from == "popup") {
        unit = request.message.unit;
        pm = parseInt(request.message.pm);
    }

    let username = tweet_url[1];
    let tweet_id = BigInt(tweet_url[3]);
    let date = new Date(Number((tweet_id >> 22n) + BigInt(1288834974657)));
    let format_date = date.toISOString().split('T')[0];

    // Search in the range of $tweet_date plus or minus $pm $unit
    // Ex.) If $pm = 3 and $unit = "Date", the below is "since.setDate(since.getDate() - pm);"
    let since = new Date(date);
    let until = new Date(date);

    // Use getFullYear() instead of getYear()
    if (unit === "Date") {
        since.setDate(since.getDate() - pm);
        until.setDate(until.getDate() + pm);
    }
    if (unit === "Month") {
        since.setMonth(since.getMonth() - pm);
        until.setMonth(until.getMonth() + pm);
    }
    if (unit === "Year") {
        since.setFullYear(since.getFullYear() - pm);
        until.setFullYear(until.getFullYear() + pm);
    }

    let format_since = since.toISOString().split('T')[0];
    let format_until = until.toISOString().split('T')[0];

    let query = `(from%3A${username})%20since%3A${format_since}%20until%3A${format_until}&src=typed_query&f=live`
    let search_url = "https://x.com/search?q=" + query;

    // コンテクストメニューをクリックしたら検索結果ページを開く
    if (request.from == "background" && request.message == "onContextMenuClick") {
        window.open(search_url, "_blank");
    }
});

