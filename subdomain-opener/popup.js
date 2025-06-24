document.getElementById('openTabs').addEventListener('click', () => {
  const domain = document.getElementById('domain').value.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
  const subdomains = document.getElementById('subdomains').value.trim().split('\n');

  subdomains.forEach(sub => {
    const url = `https://${sub.trim()}.${domain}`;
    chrome.tabs.create({ url });
  });
});
