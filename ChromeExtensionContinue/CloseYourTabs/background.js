var isFocused;

chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('calling toBlur from browser action')
  toBlur();
});

chrome.tabs.onUpdated.addListener(function() {
  chrome.windows.getAll({
      populate: true
    }, function(winArr) {
      for (var win of winArr) {
        isFocused = win.focused;

        var tabCount = win.tabs.length
        if (tabCount > 5) {
          console.log('v2 calling toBlur on window:',win,' with tab count:',tabCount, 'and focused = ',isFocused);
          toBlur(isFocused);
          //init();
        }
      }
    });
})

// chrome.windows.getAll({
//     populate: true
//   }, function(winArr) {
//     for (var win of winArr) {
//       isFocused = win.focused;
//
//       var tabCount = win.tabs.length
//       if (tabCount > 5) {
//         console.log('v2 calling toBlur on window:',win,' with tab count:',tabCount, 'and focused = ',isFocused);
//         toBlur(isFocused);
//         //init();
//       }
//     }
//   });

function init() {
  //Fired when a message is sent from either an extension process (by runtime.sendMessage) or a content script (by tabs.sendMessage).
  chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg == 'load') {
      toBlur(isFocused);
    }
  });
}

function toBlur(bool) {
  chrome.tabs.query({}, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, bool);
    }
  });
}
