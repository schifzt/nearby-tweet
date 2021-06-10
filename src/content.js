chrome.extension.onMessage.addListener(() => {
    var tweet_url = location.href.split('/');

    // Expect $tweet_url of the form ["https:", "", "twitter.com", "[username]", "status", "[tweet_id]"].
    if(tweet_url.length == 6){
        const username = tweet_url[3];
        const tweet_id = BigInt(tweet_url[5]);
        const date = new Date(Number((tweet_id >> 22n) + BigInt(1288834974657)));
        const tweet_date = date.toISOString().split('T')[0];

        const since = new Date(date);
        const until = new Date(date);

        // Search in the range of $tweet_date plus or minus 3 Days
        since.setDate(since.getDate() - 3);
        until.setDate(until.getDate() + 3);

        const tweet_since = since.toISOString().split('T')[0];
        const tweet_until = until.toISOString().split('T')[0];

        var query = "(from%3A" + username + ")%20" + "since%3A" + tweet_since + "%20" + "until%3A" + tweet_until + "&src=typed_query" + "&f=live";
        var search_url = "https://twitter.com/search?q=" + query;

        window.open(search_url, "_blank");
    }
})
