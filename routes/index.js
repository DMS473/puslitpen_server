const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const roomsRouter = require('./rooms');
const timeslotsRouter = require('./timeslots');
const roomtimeslotsRouter = require('./roomtimeslots');
const reservationsRouter = require('./reservations');

router.use('/users', usersRouter);
router.use('/rooms', roomsRouter);
router.use('/timeslots', timeslotsRouter);
router.use('/roomtimeslots', roomtimeslotsRouter);
router.use('/reservations', reservationsRouter);

module.exports = router;
