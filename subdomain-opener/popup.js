document.addEventListener("DOMContentLoaded", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab.url.includes("shodan.io/domain/")) {
    chrome.tabs.sendMessage(tab.id, { action: "getShodanData" }, (response) => {
      if (chrome.runtime.lastError) return;

      if (response?.domain) {
        document.getElementById("domain").value = response.domain;
      }
      if (response?.subdomains?.length) {
        document.getElementById("subdomains").value = response.subdomains.join("\n");
      }
    });
  }
});

document.getElementById("openTabs").addEventListener("click", () => {
  const domain = document.getElementById("domain").value.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
  const subdomains = document.getElementById("subdomains").value.trim().split('\n');

  subdomains.forEach(sub => {
    let url = `https://${sub.trim().replace(/^\/?/, '')}`;
    if (!url.includes(domain)) {
      url = `https://${sub.trim().replace(/^\/?/, '')}.${domain}`;
    }
    chrome.tabs.create({ url });
  });
});
