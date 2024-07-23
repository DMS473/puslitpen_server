const express = require('express');
const router = express.Router();
const { Reservation, User, RoomTimeSlot, Room, TimeSlot } = require('../models');
const auth = require('../middleware/auth');

// Create a new reservation
router.post('/', auth, async (req, res) => {
    try {
        const { room_timeslot_id } = req.body;
        // console.log(req.body);

        const roomTimeSlot = await RoomTimeSlot.findByPk(room_timeslot_id);

        if (!roomTimeSlot) {
            return res.status(404).json({ message: 'RoomTimeSlot not found' });
        }

        if (roomTimeSlot.status !== 'available') {
            return res.status(400).json({ message: 'RoomTimeSlot is already reserved' });
        }

        console.log('Before update:', roomTimeSlot.status);

        const reservation = await Reservation.create({
            user_id: req.user.id,
            room_timeslot_id,
            reservation_date: Date.now(),
            total_price: 10000,
            status: "pending"
        });

        roomTimeSlot.status = 'reserved';

        console.log('After update:', roomTimeSlot.status);

        await roomTimeSlot.save();

        const updatedRoomTimeSlot = await RoomTimeSlot.findByPk(room_timeslot_id);
        console.log('After save:', updatedRoomTimeSlot.status);

        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all reservations
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.findAll({
            include: [{
                model: User
            },{
                model: RoomTimeSlot,
                include: [
                    Room, TimeSlot
                ]
            }
            ]
        });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get reservation by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const reservation = await Reservation.findByPk(req.params.id);
//         if (reservation) {
//             res.json(reservation);
//         } else {
//             res.status(404).json({ error: 'Reservation not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// Update reservation
router.put('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (reservation) {
            await reservation.update(req.body);
            res.json(reservation);
        } else {
            res.status(404).json({ error: 'Reservation not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete reservation
router.delete('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (reservation) {
            await reservation.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/mybookings', auth, async (req, res) => {
    try {
      const user_id = req.user.id; // Dapatkan user ID dari token
      const reservations = await Reservation.findAll({
        where: { user_id },
        include: [
          {
            model: RoomTimeSlot,
            include: [Room, TimeSlot],
          },
        ],
      });
  
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
