chrome.extension.onMessage.addListener(function(request, _, _){
    const tweet_url = location.pathname.split('/');

    // Expect $tweet_url of the form ["", "{username}", "status", "{tweet_id}"].
    if(tweet_url.length == 4){
        // Receive $unit and $pm from background.js
        let unit = request.message.split(',')[0];
        let pm = parseInt(request.message.split(',')[1]);
        console.log([unit, pm]);

        let username = tweet_url[1];
        let tweet_id = BigInt(tweet_url[3]);
        let date = new Date(Number((tweet_id >> 22n) + BigInt(1288834974657)));
        let format_date = date.toISOString().split('T')[0];

        // Search in the range of $tweet_date plus or minus $pm $unit
        // Ex.) If $pm = 3 and $unit = "Date", the below is "since.setDate(since.getDate() - pm);"
        let since = new Date(date);
        let until = new Date(date);
        since["set" + unit](since["get" + unit]() - pm);
        until["set" + unit](until["get" + unit]() + pm);


        let format_since = since.toISOString().split('T')[0];
        let format_until = until.toISOString().split('T')[0];

        let query =
            "(from%3A" + username + ")" +
            "%20since%3A" + format_since +
            "%20until%3A" + format_until +
            "&src=typed_query" + "&f=live";

        let search_url = "https://twitter.com/search?q=" + query;

        console.log(search_url);
        // window.open(search_url, "_blank");
    }
})
