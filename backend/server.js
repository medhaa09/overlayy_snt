// const express = require('express');
// const bodyParser = require('body-parser');


// const app = express();
// app.use(bodyParser.json());

// const GeminiAPI = require('gemini-api').default;

// const geminiApi = new GeminiAPI({
//     key: 'AIzaSyB4umQ0GjxfOM1aYYcwlpub34hPqh8nVp0',
//    // secret: 'YOUR_GEMINI_API_SECRET',
//     sandbox: false, // Set to false for production
// });

// app.post('/generateSummary', async (req, res) => {
//     const { focusAreas } = req.body;
//     const narrative = `Based on the interactions, the user is focused on: ${JSON.stringify(focusAreas)}`;

//     try {
//         const completion = await openai.createCompletion({
//             model: 'text-davinci-003',
//             prompt: narrative,
//             max_tokens: 150
//         });
//         res.json({ summary: completion.data.choices[0].text.trim() });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
// });

const express = require('express');
const bodyParser = require('body-parser'); // For parsing JSON bodies
const app = express();

// Middleware to parse JSON body
app.use(bodyParser.json());

// Endpoint to handle POST request from Chrome extension
app.post('/', (req, res) => {
    const { focusAreas } = req.body; // Assuming focusAreas is an array or object sent from extension
    
    // Process focusAreas as needed
    console.log('Received focus areas:', focusAreas);

    // Example: Generate summary based on focusAreas (replace with your logic)
    const summary = `Summary generated for focus areas: ${JSON.stringify(focusAreas)}`;
    
    // Send the summary back to the extension
    res.json({ summary });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
