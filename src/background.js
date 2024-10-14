// 右クリックで現れるコンテクストメニューを作成
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        "id": "IdNearbyTweet",
        "title": "Nearby Tweet",
        "type": "normal",
        "contexts": ["all"],
    });
});

// コンテクストメニューをクリックしたことをcontent.jsにリクエストとして送信する
function onContextMenuClick(info, tab) {
    let request = {
        "from": "background",
        "message": "onContextMenuClick"
    }
    let promise = chrome.tabs.sendMessage(tab.id, request);
    promise.catch((error) => {
        console.log(error);
    });
};
chrome.contextMenus.onClicked.addListener(onContextMenuClick);

// バッジの表示を初期化
chrome.action.setBadgeText({ text: "1D" });
chrome.action.setBadgeTextColor({ color: '#FFFFFF' });
chrome.action.setBadgeBackgroundColor({ color: 'blue' });
