//Our database
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:'); // In-memory database

// Create messages table
db.serialize(() => {
    db.run('CREATE TABLE messages (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT, sender TEXT)');
});

module.exports = db;
