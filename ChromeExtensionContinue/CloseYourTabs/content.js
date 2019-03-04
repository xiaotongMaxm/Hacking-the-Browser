$(function (){
  console.log('content script is running v2');
  //chrome.runtime.sendMessage('load');

  chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse){
    console.log('message is received');
    debugger
    if (msg){
      document.body.style.filter = 'blur(5px)';
    } else {
      document.body.style.filter = '';
    }
  });
});
