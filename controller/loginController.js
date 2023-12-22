const express = require('express');
const router = express.Router();
const { Player } = require('../models/player'); // Import your User model

const login = async (req, res) => {
router.post('/user', async (req, res) => {
  const { playerEmail, playerPassword } = req.body;

  try {
    // Find the user by email (assuming email is unique)
    const player = await Player.findOne({ where: { playerEmail } });

    if (!player) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the passwords (plaintext)
    if (player.password === playerPassword) {
      // Passwords match - authentication successful
      return res.status(200).json({ message: 'Login successful', player });
    } else {
      // Passwords don't match
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
}

module.exports = { login };
