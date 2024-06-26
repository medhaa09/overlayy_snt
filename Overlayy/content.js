console.log('Content script loaded.');
let interactions = [];

function logInteraction(type, details) {
    interactions.push({
        type: type,
        details: details,
        timestamp: new Date().toISOString()
    });
}

document.addEventListener('click', (e) => {
  logInteraction('click', {
      x: e.clientX,
      y: e.clientY,
      element: e.target.tagName
  });
  console.log('Click event logged:', interactions);
});

document.addEventListener('mousemove', (e) => {
  logInteraction('hover', {
      x: e.clientX,
      y: e.clientY,
      element: e.target.tagName
  });
  console.log('Hover event logged:', interactions);
});

document.addEventListener('keydown', (e) => {
  logInteraction('typing', {
      key: e.key,
      element: e.target.tagName
  });
  console.log('Typing event logged:', interactions);
});

window.addEventListener('scroll', () => {
  logInteraction('scroll', {
      scrollTop: document.documentElement.scrollTop,
      scrollHeight: document.documentElement.scrollHeight
  });
  console.log('Scroll event logged:', interactions);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'getInteractions') {
        sendResponse({ interactions });
    }
});
