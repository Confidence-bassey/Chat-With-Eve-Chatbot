// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// API endpoint for sending messages
app.post('/api/messages', (req, res) => {
    const { message, sender } = req.body;
    const sql = 'INSERT INTO messages (message, sender) VALUES (?, ?)';
    db.run(sql, [message, sender], (err) => {
        if (err) {
            console.error('Error storing message:', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            console.log('Message stored successfully');
            res.status(201).json({ message: 'Message stored successfully' });
        }
    });
});

// API endpoint for retrieving chat history
app.get('/api/messages', (req, res) => {
    const sql = 'SELECT * FROM messages';
    db.all(sql, (err, rows) => {
        if (err) {
            console.error('Error retrieving messages:', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.json(rows);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

