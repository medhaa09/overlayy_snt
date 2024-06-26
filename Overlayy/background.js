function getActiveTabId(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs.length > 0) {
          const tabId = tabs[0].id;
          const url = tabs[0].url;
          if (url.startsWith('http://') || url.startsWith('https://')) {
              callback(tabId);
          } else {
              console.error('Active tab is not a valid web page.');
          }
      } else {
          console.error('No active tab found.');
      }
  });
}
function analyzeInteractions(interactions) {
  // Example analysis logic to determine focus areas
  let focusAreas = {};
  interactions.forEach(interaction => {
      if (!focusAreas[interaction.type]) {
          focusAreas[interaction.type] = [];
      }
      focusAreas[interaction.type].push(interaction.details);
  });
  return focusAreas;
}


// Interval to execute script on the active tab
let intervalId = setInterval(() => {
  getActiveTabId((tabId) => {
      if (tabId) {
          chrome.scripting.executeScript({
              target: { tabId: tabId, allFrames: true },
              func: () => {
                  return new Promise((resolve) => {
                      const interactions = window.interactions || [];
                      resolve(interactions);
                  });
              }
          }, (results) => {
              if (results && results[0] && results[0].result) {
                  const interactions = results[0].result;
                  console.log('Interactions received:', interactions); // Log interactions received from content.js
                  const focusAreas = analyzeInteractions(interactions);
                  generateNarrativeSummary(focusAreas);
              } else {
                  console.error('Failed to retrieve interactions from content script.');
              }
          });
      }
  });
}, 5000);

function generateNarrativeSummary(focusAreas) {
  console.log('Sending focus areas to backend:', focusAreas); // Log focus areas before sending
  fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ focusAreas })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log('Narrative summary received from backend:', data.summary); // Log the summary received
      chrome.storage.local.set({ narrativeSummary: data.summary }, () => {
          console.log('Narrative summary stored successfully:', data.summary);
      });
  })
  .catch(error => {
      console.error('Error generating or storing narrative summary:', error);
  });
}
