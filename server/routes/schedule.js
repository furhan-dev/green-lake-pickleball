const { Router } = require('express');
const router = Router();
const yup = require('yup');

const eventDAO = require('../daos/event');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

const eventSchema = yup.object({
  name: yup.string().required(),
  start: yup.date().required(),
  end: yup.date().required(),
  notes: yup.string().optional(),
});

// Create
router.post('/', isLoggedIn, isAdmin, async (req, res, next) => {
  const event = req.body;
  try {
    await eventSchema.validate(event, { abortEarly: false });
  } catch (err) {
    return res.status(400).json(err.errors);
  }

  try {
    const savedEvent = await eventDAO.create(req.user._id, event);
    res.json(savedEvent);
  } catch (e) {
    if (e.message.includes('duplicate')) {
      return res.sendStatus(409);
    }
    next(e);
  }
});

// Read - all event
router.get('/', async (req, res, next) => {
  try {
    let { page, perPage } = req.query;
    page = page ? Number(page) : 0;
    perPage = perPage ? Number(perPage) : 10;
    const events = await eventDAO.getAll(page, perPage);
    res.json(events);
  } catch (e) {
    next(e);
  }
});

// Read - single event
router.get('/:id', async (req, res, next) => {
  try {
    const event = await eventDAO.getById(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

// Read - events by date range
router.get('/', async (req, res, next) => {
  try {
    let { start, end } = req.query;
    start = start ? Date(start) : new Date();
    // set end to 1 week after start by default
    end = end ? Date(end) : new Date(start.getDate() + 7);
    const events = await eventDAO.getByDateRange(start, end);
    res.json(events);
  } catch (e) {
    next(e);
  }
});

// Update
router.put('/:id', isLoggedIn, isAdmin, async (req, res, next) => {
  const eventId = req.params.id;
  const event = req.body;
  try {
    await eventSchema.validate(event, { abortEarly: false });
  } catch (err) {
    return res.status(400).json(err.errors);
  }

  try {
    const success = await eventDAO.updateById(eventId, {
      modifiedBy: req.user._id,
      ...event,
    });
    res.sendStatus(success ? 200 : 400);
  } catch (e) {
    if (e instanceof eventDAO.BadDataError) {
      res.status(400).send(e.message);
    } else {
      res.status(500).send(e.message);
    }
    next(e);
  }
});

module.exports = router;
