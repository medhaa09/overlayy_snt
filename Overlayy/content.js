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
});

document.addEventListener('mousemove', (e) => {
    logInteraction('hover', {
        x: e.clientX,
        y: e.clientY,
        element: e.target.tagName
    });
});

document.addEventListener('keydown', (e) => {
    logInteraction('typing', {
        key: e.key,
        element: e.target.tagName
    });
});

window.addEventListener('scroll', () => {
    logInteraction('scroll', {
        scrollTop: document.documentElement.scrollTop,
        scrollHeight: document.documentElement.scrollHeight
    });
});
