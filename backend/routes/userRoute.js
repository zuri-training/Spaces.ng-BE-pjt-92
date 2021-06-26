const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../database/pool');
const router = express.Router();

router.get('/users/', async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM users');
        res.status(200).json({ users: users.rows });
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.post('/users/createusers/', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hashpassword = bcrypt.hashSync(password, 0);
        const newUser = await pool.query('INSERT INTO users(username, password, email) VALUES($1, $2, $3)', [username, hashpassword, email]);
        res.status(201).json({ message: 'User created successfully', newUser });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;


