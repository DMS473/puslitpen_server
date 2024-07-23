const express = require('express');
const router = express.Router();
const { TimeSlot } = require('../models');
const isAdmin = require('../middleware/isAdmin');

// Create a new timeslot
router.post('/', isAdmin,async (req, res) => {
    try {
        const { start_time, end_time }= req.body.data;
        // console.log(start_time)
        const timeslot = await TimeSlot.create({
            start_time,
            end_time
        });
        res.status(201).json(timeslot);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all timeslots
router.get('/', async (req, res) => {
    try {
        const timeslots = await TimeSlot.findAll({
            attributes: { exclude: ['id'] }
        });
        res.json(timeslots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get timeslot by ID
router.get('/:id', async (req, res) => {
    try {
        const timeslot = await TimeSlot.findByPk(req.params.id);
        if (timeslot) {
            res.json(timeslot);
        } else {
            res.status(404).json({ error: 'TimeSlot not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update timeslot
router.put('/:id', async (req, res) => {
    try {
        const timeslot = await TimeSlot.findByPk(req.params.id);
        if (timeslot) {
            await timeslot.update(req.body);
            res.json(timeslot);
        } else {
            res.status(404).json({ error: 'TimeSlot not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete timeslot
router.delete('/:id', async (req, res) => {
    try {
        const timeslot = await TimeSlot.findByPk(req.params.id);
        if (timeslot) {
            await timeslot.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'TimeSlot not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
