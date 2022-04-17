var unit = "Date";
var pm = "1";

// Init
chrome.browserAction.setBadgeText({ text: String(pm + unit[0]) });

// Receive $unit and $pm from popup.js
var setRange = function (unit_, pm_) {
    unit = unit_;
    pm = pm_;
    chrome.browserAction.setBadgeText({ text: String(pm + unit[0]) });
}

// Send $unit and $pm to popup.js
// var getRange = function(unit_, pm_){
//     return [unit_, pm_];
// }

// Send $unit and $pm from background.js to content.js
const onClick = () => (_, tab) => chrome.tabs.sendMessage(tab.id, { message: String(unit + ',' + pm) });

chrome.contextMenus.create({
    "title": "Nearby Tweet",
    "type": "normal",
    "contexts": ["all"],
    "onclick": onClick()
});
