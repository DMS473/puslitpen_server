const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

// User registration
router.post('/register', async (req, res) => {
  // console.log(req.body);
  // console.log("1")
  const { username, email, password, full_name, phone_number } = req.body;
  // console.log("1a")
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 13);
  // console.log("2")
  try {
    const user = await User.create({ username, email, password: hashedPassword, full_name, phone_number });
    // console.log("3")
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ error: 'Invalid username.' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid password.' });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
