chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getShodanData") {
    // Get the domain title
    const domainTitle = document.querySelector(".host-title")?.innerText?.trim() || "";

    // Get subdomains from <ul id="subdomains">
    const subdomainList = [...document.querySelectorAll("#subdomains li")];
    const subdomains = subdomainList
      .map(li => li.textContent.trim())
      .filter(t => t && t !== "*");


    sendResponse({
      domain: domainTitle,
      subdomains: [...new Set(subdomains)]
    });
  }
});
