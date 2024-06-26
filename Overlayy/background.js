let intervalId = setInterval(() => {
  chrome.scripting.executeScript({
      target: { allFrames: true },
      function: () => interactions // Assuming interactions is defined in content.js
  }, (results) => {
      if (results && results[0] && results[0].result) {
          const interactions = results[0].result;
          const focusAreas = analyzeInteractions(interactions);
          generateNarrativeSummary(focusAreas);
      } else {
          console.error('Failed to retrieve interactions from content script.');
      }
  });
}, 5000);

function generateNarrativeSummary(focusAreas) {
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
      chrome.storage.local.set({ narrativeSummary: data.summary }, () => {
          console.log('Narrative summary stored successfully:', data.summary);
      });
  })
  .catch(error => {
      console.error('Error generating or storing narrative summary:', error);
  });
}
