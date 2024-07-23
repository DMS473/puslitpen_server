const express = require('express');
const router = express.Router();
const { User } = require('../models');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// Create a new user
// router.post('/', async (req, res) => {
//     try {
//         const { username, password, email, full_name, phone_number, role} = req.body;
//         // console.log(req.body);
//         // console.log(username);
//         const user = await User.create({
//             username,
//             password,
//             email,
//             full_name,
//             phone_number,
//             role
//         });
//         res.status(201).json(user);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// Get all users
router.get('/', isAdmin,async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const user = await User.findByPk(req.params.id);
//         if (user) {
//             res.json(user);
//         } else {
//             res.status(404).json({ error: 'User not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

router.get('/profile', auth, async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ['id', 'username', 'email', 'full_name', 'phone_number']
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    //   console.log(req.user)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Update user
router.put('/:id', isAdmin,async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete user
router.delete('/:id', isAdmin,async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login user
// router.post('/login', async (req, res) => {
//     try {
//         const {username, password} = req.body;
//         let userFound = await User.findOne({
//             where:{username}
//         })
//         if (userFound) {
//             if(userFound.password == password) {
//                 res.json(userFound)
//             } else {
//                 res.send("wrong password")
//             }

//         } else {
//             res.send("email not found")
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

module.exports = router;
