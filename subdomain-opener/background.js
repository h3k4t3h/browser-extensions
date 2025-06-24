chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openWithSubOpener",
    title: "Open with Subdomain Opener",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openWithSubOpener" && info.selectionText) {
    const selectedDomain = info.selectionText.trim();
    const targetUrl = `https://www.shodan.io/domain/www.${selectedDomain}`;
    chrome.tabs.create({ url: targetUrl });
  }
});
