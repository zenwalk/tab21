import * as $ from "jquery";

$(() => {
  const queryInfo = {
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    let count = tabs.length;
    chrome.browserAction.setBadgeText({ text: "" + count });
  });

  $("#allTabsInOneWindow").click(() => {
    chrome.runtime.sendMessage({
      type: "allTabsInOneWindow"
    });
  });

  $("#sortTabsByHostname").click(() => {
    chrome.runtime.sendMessage({
      type: "sortTabsByHostname"
    });
  });

  $("#20TabsPerWindow").click(() => {
    chrome.runtime.sendMessage({
      type: "20TabsPerWindow"
    });
  });

  $("#closeNewTabs").click(() => {
    chrome.runtime.sendMessage({
      type: "closeNewTabs"
    });
  });

  $("#closeDuplicate").click(() => {
    chrome.runtime.sendMessage({
      type: "closeDuplicate"
    });
  });
});
