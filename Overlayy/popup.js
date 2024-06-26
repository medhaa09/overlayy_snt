document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('narrativeSummary', (data) => {
      document.getElementById('summary').innerText = data.narrativeSummary || 'Loading...';
  });

  chrome.storage.onChanged.addListener((changes, namespace) => {
      if (changes.narrativeSummary) {
          document.getElementById('summary').innerText = changes.narrativeSummary.newValue;
      }
  });
});
