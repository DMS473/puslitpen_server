const express = require('express');
const router = express.Router();
const { RoomTimeSlot, Room, TimeSlot } = require('../models');
const isAdmin = require('../middleware/isAdmin');
const { Op } = require('sequelize');

// Create a new room timeslot
router.post('/', isAdmin,async (req, res) => {
    try {
        const { room_id_, timeslot_id, date, status }= req.body.data;
        // console.log(req.body.data)
        const roomTimeSlot = await RoomTimeSlot.create(req.body.data);

        

        res.status(201).json(roomTimeSlot);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all room timeslots
router.get('/', async (req, res) => {
    try {
        const { start_time, end_time, page, limit } = req.query;
        const offset = (page - 1) * limit;
        console.log(req.query)
        const roomTimeSlots = await RoomTimeSlot.findAndCountAll({
            where: {
                date: {
                    [Op.between]: [start_time, end_time],
                },
            },
            // limit: parseInt(limit),
            // offset: offset,
            include: [
                Room, TimeSlot
            ]
        });
        res.json(roomTimeSlots);

        // res.json({
        //     roomTimeSlots: roomTimeSlots.rows,
        //     total: roomTimeSlots.count,
        //   });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get room timeslot by ID
router.get('/:id', async (req, res) => {
    try {
        const roomTimeSlot = await RoomTimeSlot.findByPk(req.params.id);
        if (roomTimeSlot) {
            res.json(roomTimeSlot);
        } else {
            res.status(404).json({ error: 'RoomTimeSlot not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update room timeslot
router.put('/:id', async (req, res) => {
    try {
        const roomTimeSlot = await RoomTimeSlot.findByPk(req.params.id);
        if (roomTimeSlot) {
            await roomTimeSlot.update(req.body);
            res.json(roomTimeSlot);
        } else {
            res.status(404).json({ error: 'RoomTimeSlot not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete room timeslot
router.delete('/:id', async (req, res) => {
    try {
        const roomTimeSlot = await RoomTimeSlot.findByPk(req.params.id);
        if (roomTimeSlot) {
            await roomTimeSlot.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'RoomTimeSlot not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
