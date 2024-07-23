const express = require('express');
const router = express.Router();
const { Room } = require('../models');

// Create a new room
router.post('/', async (req, res) => {
    const { room_number, room_type, capacity, price_per_slot, status } = req.body.data;
    // console.log(req.body.data);
    try {
        const room = await Room.create({ room_number, room_type, capacity, price_per_slot, status });
        res.status(201).json(room);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all rooms
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.findAll();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get room by ID
router.get('/:id', async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (room) {
            res.json(room);
        } else {
            res.status(404).json({ error: 'Room not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update room
router.put('/:id', async (req, res) => {
    try {
        console.log(req.body.data);
        const room = await Room.findByPk(req.params.id);
        if (room) {
            await room.update(req.body.data);
            res.json(room);
        } else {
            res.status(404).json({ error: 'Room not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete room
router.delete('/:id', async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (room) {
            await room.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Room not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
