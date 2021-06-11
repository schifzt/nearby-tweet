var unit = "Date";
var pm = "1";
chrome.browserAction.setBadgeText({text:String(unit[0] + String.fromCodePoint(0x00B1) + pm)});

var setRange = function(unit_, pm_){
    unit = unit_;
    pm = pm_;
    chrome.browserAction.setBadgeText({text:String(unit_[0] + String.fromCodePoint(0x00B1) + pm_)});
}

// Send $unit and $pm from background.js to content.js
const onClick = () => (_, tab) => chrome.tabs.sendMessage(tab.id, {message: String(unit + ',' + pm)});

chrome.contextMenus.create({
    "title" : "Contextual Bird's-eye",
    "type"  : "normal",
    "contexts" : ["all"],
    "onclick" : onClick()
});
