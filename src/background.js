const onClick = () => (_, tab) => chrome.tabs.sendMessage(tab.id, '');

chrome.contextMenus.create({
    "title" : "Contextual Bird's-eye",
    "type"  : "normal",
    "contexts" : ["all"],
    "onclick" : onClick()
});
