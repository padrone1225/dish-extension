// // Called when the user clicks on the browser action
// chrome.browserAction.onClicked.addListener(function (tab) {
//   // Send a message to the active tab
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     let activeTab = tabs ? tabs[0] : undefined;
//     if (activeTab && activeTab.id) {
//       chrome.tabs.sendMessage(activeTab.id, {
//         message: "clicked_browser_action",
//       });
//     }
//   });
// });

chrome.browserAction.onClicked.addListener(function (activeTab) {
  let url = "http://localhost:3000/full"; // Replace with your desired URL
  chrome.tabs.create({ url: url });
});
