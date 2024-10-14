const sendRequest = function (unit, pm) {
    const request = {
        "from": "popup",
        "message": {
            "unit": unit,
            "pm": pm
        }
    }

    // unitとpmをconten.jsに送信
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let promise = chrome.tabs.sendMessage(tabs[0].id, request);
        promise.catch((error) => {
            console.log(error);
        });
    });
}

const setBadgeText = function (unit, pm) {
    chrome.action.setBadgeText({ text: `${pm}${unit[0]}` });
    chrome.action.setBadgeTextColor({ color: '#FFFFFF' });
    chrome.action.setBadgeBackgroundColor({ color: '#4285F4' });
}

$(function () {
    $('#range_date').mousedown(function () {
        $('#radio_date').prop('checked', true);
        $('#range_date').mousemove(function () {
            let pm = $('#range_date').val();
            sendRequest("Date", pm);
            setBadgeText("Date", pm);
            $('#output_date').val(pm);
        });
    });
    $('#radio_date').change(function () {
        let pm = $('#range_date').val();
        sendRequest("Date", pm);
        setBadgeText("Date", pm);
    });


    $('#range_month').mousedown(function () {
        $('#radio_month').prop('checked', true);
        $('#range_month').mousemove(function () {
            let pm = $('#range_month').val();
            sendRequest("Month", pm);
            setBadgeText("Month", pm);
            $('#output_month').val(pm);
        });
    });
    $('#radio_month').change(function () {
        let pm = $('#range_month').val();
        sendRequest("Month", pm);
        setBadgeText("Month", pm);
    });


    $('#range_year').mousedown(function () {
        $('#radio_year').prop('checked', true);
        $('#range_year').mousemove(function () {
            let pm = $('#range_year').val();
            sendRequest("Year", pm);
            setBadgeText("Year", pm);
            $('#output_year').val(pm);
        });
    });
    $('#radio_year').change(function () {
        let pm = $('#range_year').val();
        sendRequest("Year", pm);
        setBadgeText("Year", pm);
    });
});