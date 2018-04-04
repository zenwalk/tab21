import * as $ from "jquery";

let count = 0;

$(function() {
  const queryInfo = {
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    let count = tabs.length;
    chrome.browserAction.setBadgeText({ text: "" + count });
  });

  function getHostname(str): string {
    console.log(str);
    // ^(((?:f|ht)tp)(?:s)?|(chrome))\://([^/]+)
    var re = new RegExp("^(?:f|ht)tp(?:s)?://([^/]+)", "im");
    if (str && str.match(re) != null) return str.match(re)[1].toString();
    else return "";
  }

  function strcmp(str1, str2) {
    return str1 == str2 ? 0 : str1 > str2 ? 1 : -1;
  }

  function byTitle(a, b) {
    return strcmp(a.title.toLowerCase(), b.title.toLowerCase());
  }
  function byHostname(a: chrome.tabs.Tab, b: chrome.tabs.Tab) {
    return strcmp(
      getHostname(a.url).toLowerCase(),
      getHostname(b.url).toLowerCase()
    );
  }
  function byUrl(a, b) {
    return strcmp(a.url.toLowerCase(), b.url.toLowerCase());
  }

  $("#menu0").click(() => {
    chrome.windows.getCurrent(getAllWin);
    function getAllWin(currentWin) {
      let currentWinId = currentWin.id;
      chrome.windows.getAll({ populate: true }, openWins => {
        openWins.forEach(win => {
          if (win.id !== currentWinId) {
            let idList = win.tabs.map(x => x.id);
            chrome.tabs.move(idList, {
              windowId: currentWinId,
              index: -1
            });
          }
        });
      });
    }
  });

  $("#menu4").click(() => {
    chrome.tabs.query({ currentWindow: true }, tabs => {
      let sortedTabs = tabs.sort(byHostname);
      console.log(sortedTabs);
      sortedTabs.forEach((tab, idx) => {
        chrome.tabs.move(tab.id, { index: idx });
      });
    });
  });
});
