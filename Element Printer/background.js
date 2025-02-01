chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["html2canvas.min.js", "content.js"]
    });
  });
  